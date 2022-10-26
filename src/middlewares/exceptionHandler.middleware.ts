import { NextApiRequest, NextApiResponse } from 'next';
import { HttpException } from 'next-api-decorators';
import trace from 'utils/trace';

export default function exceptionHandler(
  error: Error,
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (error instanceof HttpException) {
    trace('HttpException', error.statusCode, error.message);

    return res.status(error.statusCode).json({
      message: error.message,
      errors: error.errors,
    });
  }

  console.log('exceptionHandler', error);

  if (process.env.NODE_ENV !== 'production') {
    trace('DEV ERROR', error);
    return res.status(500).json(error);
  }

  trace('PRODUCTION ERROR', error);
  return res.status(500).json({ message: 'Internal Server Error' });
}
