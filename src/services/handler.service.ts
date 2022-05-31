import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import type { ParsedUrlQuery } from 'querystring';
import nc from 'next-connect';

import type { ApiRequest, ApiResponse } from 'next/app';
import { SsrError, SchemaError, ApiError } from 'class/error';
import { apiLogger, ssrLogger } from 'middlewares/logger.middleware';
import queryParser from 'middlewares/queryParser.middleware';
import { withSessionSsr } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import trace from 'utils/trace';

export const apiHandler = () =>
  nc<ApiRequest, ApiResponse>({
    onError: (err, req, res) => {
      if (err instanceof ApiError) {
        trace('ApiError', err.message);
        return res.status(err.code).json({ error: err.message });
      } else if (err instanceof SchemaError) {
        trace('SchemaError', err.message);
        return res.status(err.code).json({ error: err.message, schemaError: err.data });
      } else if (process.env.NODE_ENV !== 'production') {
        trace('Dev Error', err.stack);
        console.log('API ERROR :', err.stack);

        return res.status(500).send(err.message);
      } else {
        trace('ProductionError', err.stack);

        return res.status(500).json({ error: errorMessage.INTERNAL_ERROR });
      }
    },
    onNoMatch: (req, res) => {
      trace('No match route', req.url);

      res.status(405).json({ error: errorMessage.METHOD_NOT_ALLOWED });
    },
  })
    .use(apiLogger)
    .use(queryParser);

export function ssrHandler<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  handler: (
    context: GetServerSidePropsContext<Q>
  ) => OptionalPromise<GetServerSidePropsResult<P>>
): GetServerSideProps<P, Q, D> {
  // @ts-ignore
  return withSessionSsr<P, Q, D>(async (context) => {
    try {
      ssrLogger(context);

      return await handler(context);
    } catch (error) {
      if (error instanceof SsrError) {
        trace('SsrError', error.stack);

        return {
          props: {
            error: error.parse(),
          },
        };
      } else if (process.env.NODE_ENV !== 'production') {
        return {
          props: {
            error: {
              statusCode: 500,
              message: error.message || errorMessage.INTERNAL_ERROR,
            },
          },
        };
      } else {
        return {
          props: {
            error: {
              statusCode: 500,
              message: errorMessage.INTERNAL_ERROR,
            },
          },
        };
      }
    }
  });
}
