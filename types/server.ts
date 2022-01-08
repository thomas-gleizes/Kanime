import { NextApiRequest, NextApiResponse } from 'next';
import { User } from './users';

export interface DefaultResponseData<T = any> {
  success?: boolean;
  params?: any;
  data?: T;
}

export interface DefaultErrorData<T = any> {
  error: string;
  data?: T;
}

export interface Mapper<E = any, S = any> {
  one: (resource: E) => S;
  many: (resources: Array<E>) => Array<S>;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void;

