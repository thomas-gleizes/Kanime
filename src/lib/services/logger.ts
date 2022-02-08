import { NextApiRequest } from 'next';
import requestIp from 'request-ip';

import { Method } from '@types';
import { LogModel } from '@models';
import { loggerReplaceKey } from '@lib/constants';

function replaceKey(data: any) {
  const keys = Object.keys({ ...data });
  const result = {};

  for (const key of keys) {
    if (key in loggerReplaceKey) {
      result[key] = loggerReplaceKey[key];
    }
  }

  return { ...data, ...result };
}

function ip(req): string {
  const str: string = requestIp.getClientIp(req);
  const arr = str.split(':');

  return arr[arr.length - 1];
}

export default async function logger(req: NextApiRequest) {
  const userId = req.session?.user?.id || null;

  await LogModel.create({
    route: req.url.split('?')[0],
    method: req.method as Method,
    ip: ip(req),
    body: replaceKey(req.body),
    query: replaceKey(req.query),
    userId: userId,
  });
}
