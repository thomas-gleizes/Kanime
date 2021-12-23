import { ApiRequest, ApiResponse, Method, Middleware } from '../../types/server';
import { NextApiRequest, NextApiResponse } from 'next';

class Route {
  private method: Method;
  private readonly middleware: Middleware;

  constructor(method: Method, middleware: Middleware) {
    this.method = method;
    this.middleware = middleware;
  }

  public call(req: ApiRequest, res: ApiResponse): Promise<void> | void {
    return this.middleware(req, res);
  }
}

export default Route;
