import { NextApiRequest, NextApiResponse } from 'next';

export interface DefaultResponseData<T = any> {
  success?: boolean;
  params?: any;
  data?: T;
}

export interface DefaultErrorData<T = any> {
  error: string;
  data?: T;
}

export interface Resources<E = any, S = any> {
  one: (resource: E) => S;
  many: (resources: Array<E>) => Array<S>;
}

export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Middleware = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;
