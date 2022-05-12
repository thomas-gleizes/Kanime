import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from '../../../../mappers';
import { UserModel } from 'models';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'class/error';

interface ResponseData extends DefaultResponseData {
  user: User;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const [user] = UsersMapper.one(await UserModel.findById(+id));

  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  res.json({ success: true, user });
});

export default withSessionApi(handler);
