import { NextFunction } from 'next-api-decorators';

import { ApiRequest, ApiResponse } from 'app/next';
import Security from 'services/security.service';
import { errorMessage } from 'resources/constants';
import { UnauthorizedException } from 'exceptions/http';

// TODO: refactor this
export const authMiddleware = async (
  req: ApiRequest,
  res: ApiResponse<any>,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.session.token;
    const tokenPayload = Security.getTokenPayload(token);

    if (!Object.keys(req.session).length) {
      req.session = tokenPayload;
      await req.session.save();
    }
  } catch (e) {
    throw new UnauthorizedException(errorMessage.ACCESS_DENIED);
  }

  next();
};

export const authAdminMiddleware = async (
  req: ApiRequest,
  res: ApiResponse,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '') || req.session.token;
    const tokenPayload = Security.getTokenPayload(token);

    if (!Object.keys(req.session).length) {
      req.session = tokenPayload;
      await req.session.save();
    }
  } catch (e) {
    throw new UnauthorizedException(errorMessage.ACCESS_DENIED);
  }

  if (!req.session.user.isAdmin)
    throw new UnauthorizedException(errorMessage.ACCESS_DENIED);

  next();
};
