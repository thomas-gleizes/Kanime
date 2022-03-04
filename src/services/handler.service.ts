import nc from 'next-connect';

import { ApiRequest, ApiResponse } from 'app/next';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';
import SchemaError from 'class/error/SchemaError';
import loggerService from './logger.service';

const handler = nc<ApiRequest, ApiResponse>({
  onError: (err, req, res) => {
    if (err instanceof ApiError) {
      res.status(err.code).send({ error: err.message });
    } else if (err instanceof SchemaError) {
      res.status(err.code).send({ error: err.message, schemaError: err.data });
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
      res.status(500).send(err.message);
    } else {
      console.error(err.stack);

      res.status(500).send({ error: errorMessage.INTERNAL_ERROR });
    }
  },
  onNoMatch: (req, res) => {
    res.status(405).send({ error: errorMessage.METHOD_NOT_ALLOWED });
  },
}).use(async (req, res, next) => {
  loggerService(req).catch((e) => console.log('log failed :', e));

  const test = await next();

  console.log('Test', test);
});

export default handler;
