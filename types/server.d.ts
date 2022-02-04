import { NextApiRequest, NextApiResponse } from 'next';
import * as Prisma from '@prisma/client';

declare type responseCode = 404 | 400 | 500 | 401 | number;

interface DefaultResponseData<T = any> {
  success?: boolean;
  params?: any;
  debug?: T;
}

interface DefaultErrorData<T = any> {
  error: string;
  debug?: T;
}

interface ErrorPage {
  code: responseCode;
  message: string;
}

interface Mapper<E = any, S = any> {
  one: (resource: E) => S;
  many: (resources: Array<E>) => Array<S>;
}

type Method = Prisma.Method;

type Middleware = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;
