import { NextApiRequest, NextApiResponse } from 'next';

import { Method, Middleware } from '@types';
import { ApiError, SchemaError } from '@errors';
import loggerService from '@services/logger.service';
import { errorMessage } from '@lib/constants';

class RouterUseless {
  private readonly _get: Middleware[];
  private readonly _post: Middleware[];
  private readonly _put: Middleware[];
  private readonly _patch: Middleware[];
  private readonly _delete: Middleware[];

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
      this[key].push(middleware);
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

    const routes = this['_' + method.toLowerCase()];

    loggerService(req).catch((e) => console.log('log failed :', e));

    try {
      if (!routes.length) throw new ApiError('405', errorMessage.METHOD_NOT_ALLOWED);

      for (const route of routes) {
        await route(req, res);
      }
    } catch (e) {
      if (e instanceof ApiError) {
        res.status(e.code).send({ error: e.message });
      } else if (e instanceof SchemaError) {
        res.status(e.code).send({ error: e.message, keys: e.data });
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Error :', e);

        res.status(500).send(e.message);
      } else {
        res.status(500).send(errorMessage.INTERNAL_ERROR);
      }
    }
  }
}

export default new RouterUseless();
