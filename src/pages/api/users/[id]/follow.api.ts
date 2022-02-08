import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Users } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import handler from '@lib/routing/handler';
import { UserFollowModel, UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';

interface Data extends DefaultResponseData {
  users: Users;
  length: number;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findFollows(+id)).map(([user]) => user);

  res.send({ success: true, users, length: users.length });
});

handler.post(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<DefaultResponseData>) => {
    const { query, session } = req;

    try {
      await UserFollowModel.create(+session.user.id, +query.id);

      res.status(201).send({ success: true });
    } catch (e) {
      throw new ApiError(400, errorMessage.FOLLOW);
    }
  }
);

handler.delete(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<DefaultResponseData>) => {
    const { query, session } = req;

    try {
      const result = await UserFollowModel.delete(+session.user.id, +query.id);

      res.status(200).send({ success: true, debug: result });
    } catch (e) {
      throw new ApiError(400, errorMessage.UNFOLLOW);
    }
  }
);

export default withSessionApi(handler);
