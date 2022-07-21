import { ApiRequest, ApiResponse } from 'next/app';
import { verifyUser } from 'middlewares/auth.middleware';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';

const handler = apiHandler();

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<{ user: User }>) => {
  const user = await UserModel.findById(req.session.user.id);

  return res.send({ success: true, user: UsersMapper.one(user) });
});

export default withSessionApi(handler);
