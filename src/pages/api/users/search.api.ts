import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { ApiError } from 'errors';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ users: Users }>) => {
  const { query, limit, skip } = req.query;

  if (!query) throw new ApiError(HttpStatus.BAD_REQUEST, 'query is required');

  const users = await UserModel.search(query as string, { limit: +limit, skip: +skip });

  return res.json({ success: true, users: UsersMapper.many(users) });
});

export default withSessionApi(handler);
