import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from 'mapper';
import { UserModel } from 'models';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface ResponseData extends DefaultResponseData {
  user: User;
}

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const [user] = UsersMapper.one(await UserModel.findById(+id));

  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  res.send({ success: true, user });
});

export default withSessionApi(handler);
