declare type responseCode = 404 | 400 | 500 | 401 | number;

declare type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface DefaultResponse<T = any> {
  success?: boolean;
  params?: any;
  debug?: T;
}

interface DefaultError<T = any> {
  error: string;
  debug?: T;
}

interface ErrorPage {
  code: responseCode;
  message: string;
}

interface Mapper<E = any, S = any, O = {}> {
  one: (resource: E, options?: O) => S;
  many: (resources: Array<E>, options?: O) => Array<S>;
}

type Middleware = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;
