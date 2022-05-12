import { GetServerSidePropsContext, NextApiRequest } from 'next';

import { LogModel } from 'models';
import { loggerReplaceKey } from 'resources/constants';
import ip from 'utils/ip';

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

export function apiLogger(req: NextApiRequest): any {
  const userId = req.session?.user?.id || null;

  const [path, params] = req.url.split('?');

  return LogModel.create({
    path: path,
    method: req.method as Method,
    ip: ip(req),
    body: replaceKey(req.body),
    params: replaceKey(Object.fromEntries(new URLSearchParams(params))),
    userId: userId,
  }).catch((err) => console.log('ERROR LOGGER : ', err));
}

export async function ssrLogger(context: GetServerSidePropsContext) {
  // TODO: not working: session is undefined
  const userId = context.req?.session?.user?.id || null;

  console.log('SSR session', context.req.session);

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
