import type { NextFetchEvent, NextRequest } from 'next/server';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');

  console.log('Token', token);
}
