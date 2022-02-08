import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { ApiError, SchemaError } from '@errors';
import { errorMessage } from '@lib/constants';
import logger from '@services/logger';

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    if (err instanceof ApiError) {
      res.status(err.code).send({ error: err.message });
    } else if (err instanceof SchemaError) {
      res.status(err.code).send({ error: err.message, schemaError: err.data });
    } else if (process.env.NODE_ENV !== 'production') {
      console.error(err.stack);
      res.status(500).send(err.message);
    } else {
      console.error(err.stack);

      res.status(500).send(errorMessage.INTERNAL_ERROR);
    }
  },
  onNoMatch: (req, res) => {
    res.status(405).send({ error: errorMessage.METHOD_NOT_ALLOWED });
  },
}).use((req, res, next) => {
  logger(req).catch((e) => console.log('log failed :', e));

  next();
});

export default handler;
