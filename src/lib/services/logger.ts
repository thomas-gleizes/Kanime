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

export default async function logger(req: NextApiRequest) {
  await LogModel.create(
    req.url.split('?')[0],
    req.method as Method,
    requestIp.getClientIp(req),
    replaceKey(req.body),
    replaceKey(req.query),
    req?.session?.user?.token
  );
}
