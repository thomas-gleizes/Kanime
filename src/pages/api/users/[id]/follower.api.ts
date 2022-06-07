import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';

interface Data extends DefaultResponseData {
  users: Users;
  length: number;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findFollowers(+id)).map(
    ([user]) => user
  );

  res.json({ success: true, users, length: users.length });
});

export default withSessionApi(handler);
