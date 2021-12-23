import { NextApiRequest, NextApiResponse } from 'next';

import { Middleware } from '@types';
import { ApiError } from '@errors';
import Route from '@lib/router/route';

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

  public get(...middlewares: Middleware[]) {
    for (const middleware of middlewares) {
      this._get.push(new Route('GET', middleware));
    }
  }

  public post(...middlewares: Middleware[]) {
    for (const middleware of middlewares) {
      this._post.push(new Route('POST', middleware));
    }
  }

  public put(...middlewares: Middleware[]) {
    for (const middleware of middlewares) {
      this._put.push(new Route('PUT', middleware));
    }
  }

  public patch(...middlewares: Middleware[]) {
    for (const middleware of middlewares) {
      this._patch.push(new Route('PATCH', middleware));
    }
  }

  public delete(...middlewares: Middleware[]) {
    for (const middleware of middlewares) {
      this._delete.push(new Route('DELETE', middleware));
    }
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
