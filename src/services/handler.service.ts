import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next/types';
import nc from 'next-connect';

import { ApiRequest, ApiResponse, ServerSideProps } from 'app/next';
import { SsrError, SchemaError, ApiError } from 'class/error';
import { errorMessage } from 'resources/constants';
import { ssrLogger } from 'services/logger.service';
import { apiLogger } from 'middlewares/logger.middleware';
import queryParser from 'middlewares/queryParser.middleware';
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
      console.log('No match');
      trace('No match route', req.url);

      res.status(405).json({ error: errorMessage.METHOD_NOT_ALLOWED });
    },
  })
    .use(apiLogger)
    .use(queryParser);

export function ssrHandler<P = {}>(
  handler: (
    context: GetServerSidePropsContext<any, any>
  ) => Promise<GetServerSidePropsResult<P>>
): ServerSideProps<P> {
  return (context) => {
    ssrLogger(context).catch((e) => console.log('ssr log failed :', e));

    return handler(context).catch((error) => {
      console.log('ssr error: ', error);

      if (error instanceof SsrError) {
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
    });
  };
}
