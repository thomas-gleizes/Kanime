import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Users } from '@types';
import handler from '@lib/routing';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';
import { withSessionApi } from '@services/session.service';

interface Data extends DefaultResponseData {
  users: Users;
  length: number;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findFollowers(+id)).map(
    ([user]) => user
  );

  res.send({ success: true, users, length: users.length });
});

export default withSessionApi(handler);
