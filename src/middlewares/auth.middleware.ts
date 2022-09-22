import { ApiRequest, ApiResponse } from 'next/app';
import Security from 'services/security.service';
import { errorMessage } from 'resources/constants';
import { UnauthorizedException } from 'next-api-decorators';

// TODO: refactor this
export const authMiddleware = async (req: ApiRequest, res: ApiResponse<any>, next) => {
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

export const authAdminMiddleware = async (req, res, next) => {
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
