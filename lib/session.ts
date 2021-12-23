// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { GetServerSideProps, NextApiRequest } from 'next';
import type { IronSessionOptions } from 'iron-session';

import { User } from '@types';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import ApiError from './errors/ApiError';

const sessionOptions: IronSessionOptions = {
  password: process.env.NODE_SECRET_TOKEN as string,
  cookieName: 'iron-session/examples/next.js',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
};

export const withSessionSsr = (handler: GetServerSideProps) => withIronSessionSsr(handler, sessionOptions);
export const withSessionApi = (handler) => withIronSessionApiRoute(handler, sessionOptions);

export const verifyUser = (req: NextApiRequest) => {
  if (!req.session.user)
    throw new ApiError(401, 'Access denied');
};

export const verifyAdmin = (req: NextApiRequest) => {
  verifyUser(req);

  if (!req.session.user.isAdmin)
    throw new ApiError(401, 'Access denied');
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user: User;
  }
}
