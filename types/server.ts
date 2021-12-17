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

export interface Router {
  get?: (req: NextApiRequest, res: NextApiResponse) => any;
  post?: (req: NextApiRequest, res: NextApiResponse) => any;
  delete?: (req: NextApiRequest, res: NextApiResponse) => any;
  put?: (req: NextApiRequest, res: NextApiResponse) => any;
  patch?: (req: NextApiRequest, res: NextApiResponse) => any;
  handler: (req: NextApiRequest, res: NextApiResponse) => any;
}

export interface Resources<E = any, S = any> {
  one: (resource: E) => S;
  many: (resources: Array<E>) => Array<S>;
}
