import { ApiRequest, ApiResponse } from 'app/next';
import { verifyUser } from 'middlewares/auth.middleware';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';

const handler = apiHandler();

interface ResponseData extends DefaultResponseData {
  user: User;
}

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const [user] = UsersMapper.one(await UserModel.findById(req.session.user.id));

  res.send({ success: true, user });
});

export default withSessionApi(handler);
