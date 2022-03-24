import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import ApiError from 'class/error/ApiError';
import { UsersMapper } from 'mapper/index';
import { UserModel } from 'models/index';

interface ResponseData extends DefaultResponseData {
  users: Users;
}

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { query, limit, skip } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const users = UsersMapper.many(
    await UserModel.search(query as string, { limit: +limit, skip: +skip })
  ).map(([user]) => user);

  res.json({ success: true, users: users });
});

export default withSessionApi(handler);
