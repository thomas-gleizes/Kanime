// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
import type { NextApiRequest } from 'next';
import type { IronSessionOptions } from 'iron-session';

import { User } from '@types';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import ApiError from '../errors/ApiError';
import Security from '@services/security';
import { errorMessage } from '@lib/constants';

const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_TOKEN as string,
  cookieName: 'kanime_auth',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export const withSessionSsr = (handler) => withIronSessionSsr(handler, sessionOptions);
export const withSessionApi = (handler) =>
  withIronSessionApiRoute(handler, sessionOptions);

export const verifyUser = async (req: NextApiRequest) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.session.token;
    const content = Security.getTokenPayload(token);

    if (!Object.keys(req.session).length) {
      req.session = content;
      await req.session.save();
    }
  } catch (e) {
    throw new ApiError('401', errorMessage.ACCESS_DENIED);
  }
};

export const verifyAdmin = async (req: NextApiRequest) => {
  await verifyUser(req);
  if (!req.session.user.isAdmin) throw new ApiError(401, errorMessage.ACCESS_DENIED);
};

// This is where we specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    user: User;
    token: string;
  }
}
