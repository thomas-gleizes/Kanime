import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { UserFollowModel, UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ users: Users }>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  const users = await UserModel.findFollows(+id);

  return res.json({ success: true, users: UsersMapper.many(users) });
});

handler.post(verifyUser, async (req: ApiRequest, res: ApiResponse) => {
  const { query, session } = req;

  try {
    await UserFollowModel.create(+session.user.id, +query.id);

    return res.status(HttpStatus.CREATED).json({ success: true });
  } catch (e) {
    throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.FOLLOW);
  }
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse) => {
  const { query, session } = req;

  try {
    const result = await UserFollowModel.delete(+session.user.id, +query.id);

    return res.json({ success: true, debug: result });
  } catch (e) {
    throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.UNFOLLOW);
  }
});

export default withSessionApi(handler);
