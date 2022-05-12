import requestIp from 'request-ip';

export default function ip(req): string {
  const str: string = requestIp.getClientIp(req);
  const arr = str?.split(':');

  return arr[arr.length - 1];
}
