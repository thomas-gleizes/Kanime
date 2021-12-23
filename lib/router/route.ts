import { NextApiRequest, NextApiResponse } from 'next';
import { Method, Middleware } from '@types';

class Route {
  private method: Method;
  private readonly middleware: Middleware;

  constructor(method: Method, middleware: Middleware) {
    this.method = method;
    this.middleware = middleware;
  }

  public call(req: NextApiRequest, res: NextApiResponse): Promise<void> | void {
    return this.middleware(req, res);
  }
}

export default Route;
