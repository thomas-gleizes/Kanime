import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

declare type route = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void | undefined;

class Router {
  private _get: route;

  set get(route: route) {
    this._get = route;
  }

  private _post: route;

  set post(route: route) {
    this._post = route;
  }

  private _put: route;

  set put(route: route) {
    this._put = route;
  }

  private _patch: route;

  set patch(route: route) {
    this._patch = route;
  }

  private _delete: route;

  set delete(route: route) {
    this._delete = route;
  }

  public async handler(req, res): Promise<void> {
    const { method } = req;

    try {
      if (method === 'GET' && typeof this._get !== 'undefined') {
        await this._get(req, res);
      } else if (method === 'POST' && typeof this._post !== 'undefined') {
        await this._post(req, res);
      } else if (method === 'PUT' && typeof this._put !== 'undefined') {
        await this._put(req, res);
      } else if (method === 'PATCH' && typeof this._patch !== 'undefined') {
        await this._patch(req, res);
      } else if (method === 'DELETE' && typeof this._delete !== 'undefined') {
        await this._delete(req, res);
      } else {
        res.status(404).json({ error: 'No matching routes' });
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error :', e);
        res.status(500).send(e.message);
      } else {
        res.status(500).send('Internal error');
      }
    }
  }
}

export default new Router();
