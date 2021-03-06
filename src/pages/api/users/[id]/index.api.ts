import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { ApiError } from 'errors';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ user: User }>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);

  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  return res.json({ success: true, user: UsersMapper.one(user) });
});

export default withSessionApi(handler);
