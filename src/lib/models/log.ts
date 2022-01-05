import { Log } from '@prisma/client';
import connexion from '@services/connexion';
import { Method } from '@types';

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
      auth_token: authToken,
      body: JSON.stringify(body),
      query: JSON.stringify(query),
    },
  });
