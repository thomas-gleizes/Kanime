import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import { verifyUser, withSessionApi } from '@services/session';
import router from '@lib/routing/router';
import { UserFollowModel, UserModel } from '@models';
import { UsersResources } from '@resources';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {
  users: User[];
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, 'user not found');

  const users = UsersResources.many(await UserModel.findFollows(+id)).map(
    ([user]) => user
  );

  res.send({ success: true, users });
});

router.post(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<DefaultResponseData>) => {
    const { query, session } = req;

    try {
      await UserFollowModel.createFollow(+session.user.id, +query.id);

      res.status(201).send({ success: true });
    } catch (e) {
      throw new ApiError(400, 'you already follow this user !');
    }
  }
);

router.delete(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<DefaultResponseData>) => {
    const { query, session } = req;

    try {
      const result = await UserFollowModel.deleteFollow(+session.user.id, +query.id);

      res.status(200).send({ success: true, data: result });
    } catch (e) {
      throw new ApiError(400, "you can't unfollow this user");
    }
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
