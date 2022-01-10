import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Users } from '@types';
import router from '@lib/routing/router';
import { ApiError } from '@errors';
import { UsersMapper } from '@mapper';
import { UserModel } from '@models';

interface Data extends DefaultResponseData {
  users: Users;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { query, limit, skip } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const users = UsersMapper.many(
    await UserModel.search(query as string, { limit: +limit, skip: +skip })
  ).map(([user]) => user);

  res.send({ success: true, users: users });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
