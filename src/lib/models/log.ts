import { Prisma, Log } from '@prisma/client';

import { Method } from '@types';
import connexion, { ConnexionType } from '@services/connexion';
import Model from '@lib/models/model';

type crateData = {
  route: string;
  method: Method;
  ip: string;
  body: any;
  query: any;
  authToken?: string;
};

class LogModel extends Model<Prisma.LogDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.log);
  }

  public get = (limit: number, skip: number): Promise<Log[]> =>
    this.model.findMany({ skip: skip, take: limit, orderBy: [{ id: 'desc' }] });

  public create = (data: crateData): Promise<Log> =>
    this.model.create({
      data: {
        route: data.route,
        method: data.method,
        ip: data.ip,
        auth_token: data.authToken,
        body: data.body ? JSON.stringify(data.body) : null,
        query: data.query ? JSON.stringify(data.query) : null,
      },
    });
}

export default new LogModel(connexion);
