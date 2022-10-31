import { IncomingMessage } from 'http'
import requestIp from 'request-ip'

export default function ip(req: IncomingMessage): string {
  const str = requestIp.getClientIp(req) as string
  const arr = str?.split(':')

  return arr[arr.length - 1] as string
}
