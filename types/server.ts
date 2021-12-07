import { NextApiRequest, NextApiResponse } from "next";

export interface CustomResponseData {
  success?: boolean;
  params?: any;
}

export interface CustomErrorData {
  error: string;
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
