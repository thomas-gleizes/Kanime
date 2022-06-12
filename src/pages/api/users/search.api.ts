import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { ApiError } from 'errors';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';

interface ResponseData extends DefaultResponseData {
  users: Users;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { query, limit, skip } = req.query;

  if (!query) throw new ApiError(HttpStatus.BAD_REQUEST, 'query is required');

  const users = UsersMapper.many(
    await UserModel.search(query as string, { limit: +limit, skip: +skip })
  ).map(([user]) => user);

  res.json({ success: true, users: users });
});

export default withSessionApi(handler);
