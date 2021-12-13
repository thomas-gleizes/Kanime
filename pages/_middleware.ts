import type { NextFetchEvent, NextRequest } from 'next/server';
import { PrismaClient, Log } from '@prisma/client';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const params = {};
  req.nextUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const log: Log = {
    route: req.nextUrl.pathname,
    method: req.method,
    query: JSON.stringify(params),
    auth_token: req.headers.get('Authorization'),
    body: 'currently not allowed',
  };

  // const prisma = new PrismaClient();
  //
  // await prisma.log.create({
  //   data: log,
  // });
}
