import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UserModel } from 'models';
import { ApiError } from 'errors';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { UsersMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ user: User }>) => {
  const { slug } = req.query;

  const user = await UserModel.findBySlug(slug as string);

  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  return res.json({ success: true, user: UsersMapper.one(user) });
});

export default withSessionApi(handler);
