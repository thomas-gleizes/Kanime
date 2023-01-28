import { GetServerSidePropsContext, NextApiRequest } from 'next'

import { logModel } from 'models'
import { loggerReplaceKey } from 'resources/constants'
import ip from 'utils/ip'

function replaceKey(data: object) {
  const keys = Object.keys(data)
  const result: { [key: string]: string } = {}

  for (const key of keys) if (key in loggerReplaceKey) result[key] = loggerReplaceKey[key] as string

  return { ...data, ...result }
}

export function apiLogger(req: NextApiRequest): any {
  const userId = req.session?.user?.id

  if (req.url) {
    const [path, params] = req.url.split('?') as [string, string]

    return logModel
      .create({
        path: path,
        method: req.method as Method,
        ip: ip(req),
        body: replaceKey(req.body),
        params: replaceKey(Object.fromEntries(new URLSearchParams(params))),
        userId: userId
      })
      .catch((err) => console.log('ERROR LOGGER : ', err))
  }
}

export async function ssrLogger(context: GetServerSidePropsContext) {
  const userId = context.req?.session?.user?.id

  const [path, params] = context.resolvedUrl.split('?') as [string, string]

  await logModel.create({
    path: path,
    method: context.req.method as Method,
    ip: ip(context.req),
    body: {},
    params: replaceKey(Object.fromEntries(new URLSearchParams(params))),
    userId: userId
  })
}
