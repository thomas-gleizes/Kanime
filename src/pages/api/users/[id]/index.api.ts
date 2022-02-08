import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import handler from '@lib/routing';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';
import { withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {
  user: User;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const [user] = UsersMapper.one(await UserModel.findById(+id));

  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  res.send({ success: true, user });
});

export default withSessionApi(handler);
