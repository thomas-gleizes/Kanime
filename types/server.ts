import { NextApiRequest, NextApiResponse } from 'next';
import * as Prisma from '@prisma/client';

export declare type responseCode = 404 | 400 | 500 | 401 | number;

export interface DefaultResponseData<T = any> {
  success?: boolean;
  params?: any;
  debug?: T;
}

export interface DefaultErrorData<T = any> {
  error: string;
  debug?: T;
}

export interface ErrorPage {
  code: responseCode;
  message: string;
}

export interface Mapper<E = any, S = any> {
  one: (resource: E) => S;
  many: (resources: Array<E>) => Array<S>;
}

export type Method = Prisma.Method;

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;
