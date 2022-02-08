import Security from '@services/security';
import { errorMessage } from '@lib/constants';
import { ApiError } from '@errors';

export const verifyUser = async (req, res, next) => {
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

  next();
};

export const verifyAdmin = async (req, res, next) => {
  await verifyUser(req, res, next);
  if (!req.session.user.isAdmin) throw new ApiError(401, errorMessage.ACCESS_DENIED);

  next();
};
