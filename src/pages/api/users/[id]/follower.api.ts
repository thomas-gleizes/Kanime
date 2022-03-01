import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'ressources/constants';
import { UserModel } from 'models';
import { UsersMapper } from 'mapper';
import ApiError from 'class/error/ApiError';

interface Data extends DefaultResponse {
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
