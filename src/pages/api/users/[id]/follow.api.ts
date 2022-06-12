import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { UserFollowModel, UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';

interface ResponseData extends DefaultResponseData {
  users: Users;
  length: number;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findFollows(+id)).map(([user]) => user);

  res.json({ success: true, users, length: users.length });
});

handler.post(verifyUser, async (req: ApiRequest, res: ApiResponse) => {
  const { query, session } = req;

  try {
    await UserFollowModel.create(+session.user.id, +query.id);

    res.status(201).json({ success: true });
  } catch (e) {
    throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.FOLLOW);
  }
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse) => {
  const { query, session } = req;

  try {
    const result = await UserFollowModel.delete(+session.user.id, +query.id);

    res.json({ success: true, debug: result });
  } catch (e) {
    throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.UNFOLLOW);
  }
});

export default withSessionApi(handler);
