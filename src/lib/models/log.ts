import { Log } from '@prisma/client';

import { Method } from '@types';
import connexion from '@services/connexion';
import Security from '@services/security';

const { log } = connexion;

export const create = (
  route: string,
  method: Method,
  ip: string,
  body: any,
  query: any,
  authToken?: string
): Promise<Log> =>
  log.create({
    data: {
      route: route,
      method: method,
      ip: ip,
      auth_token: authToken ? JSON.stringify(Security.getTokenPayload(authToken)) : null,
      body: JSON.stringify(body),
      query: JSON.stringify(query),
    },
  });

export const get = (limit: number, skip: number): Promise<Log[]> =>
  log.findMany({ skip: skip, take: limit });
