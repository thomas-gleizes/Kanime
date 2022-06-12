import type { IronSessionOptions } from 'iron-session';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { ApiHandler } from 'next/app';
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from 'next';
import { ParsedUrlQuery } from 'querystring';

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_TOKEN as string,
  cookieName: 'kanime_auth',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const withSessionApi = (handler: ApiHandler<any>) =>
  withIronSessionApiRoute(handler, sessionOptions);

export function withSessionSsr<
  P extends { [key: string]: any } = { [key: string]: any },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
>(
  handler: (
    context: GetServerSidePropsContext<Q, D>
  ) => Promise<GetServerSidePropsResult<P>>
): GetServerSideProps<P, Q, D> {
  return withIronSessionSsr(handler, sessionOptions);
}

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user: User;
    token: string;
  }
}
