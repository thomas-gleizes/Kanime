import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Users } from '@types';
import handler from '@lib/routing';
import { ApiError } from '@errors';
import { UsersMapper } from '@mapper';
import { UserModel } from '@models';
import { withSessionApi } from '@services/session.service';

interface Data extends DefaultResponseData {
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
