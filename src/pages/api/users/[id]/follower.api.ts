import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Users } from '@types';
import router from '@lib/routing/handler';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';

interface Data extends DefaultResponseData {
  users: Users;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findFollowers(+id)).map(
    ([user]) => user
  );

  res.send({ success: true, users, length: users.length });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
