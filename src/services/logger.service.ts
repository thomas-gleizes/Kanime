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

export async function loggerService(req: NextApiRequest) {
  const userId = req.session?.user?.id || null;

  const [path, params] = req.url.split('?');

  await LogModel.create({
    path: path,
    method: req.method as Method,
    ip: ip(req),
    body: replaceKey(req.body),
    params: replaceKey(Object.fromEntries(new URLSearchParams(params))),
    userId: userId,
  });
}

export async function ssrLogger(context: GetServerSidePropsContext) {
  // TODO: not working: session is undefined
  const userId = context.req?.session?.user?.id || null;

  const [path, params] = context.resolvedUrl.split('?');

  await LogModel.create({
    path: path,
    method: context.req.method as Method,
    ip: ip(context.req),
    body: {},
    params: replaceKey(Object.fromEntries(new URLSearchParams(params))),
    userId: userId,
  });
}
