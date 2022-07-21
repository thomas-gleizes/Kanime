import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ users: Users }>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  const users = await UserModel.findFollowers(+id);

  return res.json({ success: true, users: UsersMapper.many(users) });
});

export default withSessionApi(handler);
