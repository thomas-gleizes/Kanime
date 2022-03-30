import nc from 'next-connect';

import { ApiRequest, ApiResponse, ServerSideProps } from 'app/next';
import { errorMessage } from 'resources/constants';
import ApiError from 'class/error/ApiError';
import SchemaError from 'class/error/SchemaError';
import loggerService from './logger.service';
import { SsrError } from 'class/error';
import { GetServerSidePropsContext } from 'next';
import { GetServerSidePropsResult } from 'next/types';

export const apiHandler = nc<ApiRequest, ApiResponse>({
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      res.status(err.code).json({ error: err.message });
    } else if (err instanceof SchemaError) {
      res.status(err.code).json({ error: err.message, schemaError: err.data });
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
      res.status(500).send(err.message);
    } else {
      console.error(err.stack);

      res.status(500).json({ error: errorMessage.INTERNAL_ERROR });
    }
  },
  onNoMatch: (req, res) => {
    res.status(405).json({ error: errorMessage.METHOD_NOT_ALLOWED });
  },
}).use(async (req, res, next) => {
  loggerService(req).catch((e) => console.log('log failed :', e));

  next();
});

export default function ssrHandler<P = {}>(
  handler: (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<P>>
): ServerSideProps<P> {
  return (context) => {
    return handler(context).catch((error) => {
      if (error instanceof SsrError) {
        return {
          props: {
            error: error.parse(),
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
