import { NextApiRequest, NextApiResponse } from 'next';

import { Method, Middleware } from '@types';
import { ApiError } from '@errors';
import Route from './route';

class Router {
  private readonly _get: Route[];
  private readonly _post: Route[];
  private readonly _put: Route[];
  private readonly _patch: Route[];
  private readonly _delete: Route[];

  constructor() {
    this._get = [];
    this._post = [];
    this._put = [];
    this._patch = [];
    this._delete = [];
  }

  private add(method: Method, ...middlewares: Middleware[]): void {
    const key = `_${method.toLowerCase()}`;

    for (const middleware of middlewares) {
      this[key].push(new Route(method, middleware));
    }
  }

  public get(...middlewares: Middleware[]): void {
    this.add('GET', ...middlewares);
  }

  public post(...middlewares: Middleware[]): void {
    this.add('POST', ...middlewares);
  }

  public put(...middlewares: Middleware[]): void {
    this.add('PUT', ...middlewares);
  }

  public patch(...middlewares: Middleware[]): void {
    this.add('PATCH', ...middlewares);
  }

  public delete(...middlewares: Middleware[]): void {
    this.add('DELETE', ...middlewares);
  }

  public all(...middlewares: Middleware[]) {
    this.get(...middlewares);
    this.post(...middlewares);
    this.put(...middlewares);
    this.patch(...middlewares);
    this.delete(...middlewares);
  }

  public async handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { method } = req;

    try {
      for (const route of this.getRoutes(method)) {
        await route.call(req, res);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        res.status(e.code).send({ error: e.message });
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Error :', e);

        res.status(500).send(e.message);
      } else {
        res.status(500).send('Internal error');
      }
    }
  }

  private getRoutes(method: string): Route[] {
    switch (method) {
      case 'GET':
        return this._get;
      case 'POST':
        return this._post;
      case 'PATCH':
        return this._patch;
      case 'PUT':
        return this._put;
      case 'DELETE':
        return this._delete;
    }
  }
}

export default new Router();
