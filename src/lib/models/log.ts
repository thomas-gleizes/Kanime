import { Prisma, Log } from '@prisma/client';

import { Method } from '@types';
import connexion, { ConnexionType } from '@services/connexion';
import Model from '@lib/models/model';
import Security from '@services/security';

class LogModel extends Model<Prisma.LogDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.log);
  }

  public get = (limit: number, skip: number): Promise<Log[]> =>
    this.connexion.findMany({ skip: skip, take: limit });

  public create = (
    route: string,
    method: Method,
    ip: string,
    body: any,
    query: any,
    authToken?: string
  ): Promise<Log> =>
    this.connexion.create({
      data: {
        route: route,
        method: method,
        ip: ip,
        auth_token: authToken
          ? JSON.stringify(Security.getTokenPayload(authToken))
          : null,
        body: body ? JSON.stringify(body) : null,
        query: query ? JSON.stringify(query) : null,
      },
    });
}

export default new LogModel(connexion);
