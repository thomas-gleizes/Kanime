import { NextApiRequest, NextApiResponse } from 'next';
import { Catch, HttpException, UseMiddleware } from 'next-api-decorators';

import { apiLogger } from 'middlewares/logger.middleware';
import queryParser from 'middlewares/queryParser.middleware';
import trace from 'utils/trace';

function exceptionHandler(error: unknown, req: NextApiRequest, res: NextApiResponse) {
  if (error instanceof HttpException) {
    trace('HttpException', error.statusCode, error.message);

    console.log('Error', error);

    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  if (process.env.NODE_ENV !== 'production') {
    trace('DEV ERROR', error);
    return res.status(500).json(error);
  }

  trace('PRODUCTION ERROR', error);
  return res.status(500).json({ message: 'Internal Server Error' });
}

@UseMiddleware(queryParser, apiLogger)
@Catch(exceptionHandler)
export default abstract class ApiHandler {}
