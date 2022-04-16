import { GetServerSidePropsContext, NextApiRequest } from 'next';
import requestIp from 'request-ip';

import { LogModel } from 'models';
import { loggerReplaceKey } from 'resources/constants';

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

export async function apiLogger(req: NextApiRequest) {
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

export async function ssrLogger(context: GetServerSidePropsContext) {
  const userId = context.req?.session?.user?.id || null;

  console.log(context);
  console.log('ssrLogger');

  await LogModel.create({
    route: '',
    method: 'GET',
    ip: '',
    body: {},
    query: replaceKey(context.req.query),
    userId: userId,
  });
}
