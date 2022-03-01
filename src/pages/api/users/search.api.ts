import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import ApiError from 'class/error/ApiError';
import { UsersMapper } from 'mapper/index';
import { UserModel } from 'models/index';

interface Data extends DefaultResponse {
  users: Users;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query, limit, skip } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const users = UsersMapper.many(
    await UserModel.search(query as string, { limit: +limit, skip: +skip })
  ).map(([user]) => user);

  res.send({ success: true, users: users });
});

export default withSessionApi(handler);
