import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultErrorData, DefaultResponseData } from '@types';
import { verifyUser, withSessionApi } from '@lib/session';
import router from '@lib/router/router';
import connexion from '@lib/connexion';
import UsersResources from '@lib/resources/UsersResources';
import ApiError from '@lib/errors/ApiError';

interface Data extends DefaultResponseData {}

interface Error extends DefaultErrorData {
  message: string;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  const { id } = req.query;

  const user = await connexion.user.findUnique({
    where: { id: +id },
  });

  if (!user) throw new ApiError(404, 'user not found');

  const users = UsersResources.many(
    await connexion.user.findMany({
      where: {
        followers: { some: { follower_id: +id } },
      },
    })
  ).map(([user]) => user);

  res.send({ success: true, data: users });
});

router.post(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    const { query, session } = req;

    try {
      await connexion.userFollow.create({
        data: {
          follower_id: +session.user.id,
          follow_id: +query.id,
        },
      });

      res.status(201).send({ success: true });
    } catch (e) {
      throw new ApiError(400, 'you already follow this user !');
    }
  }
);

router.delete(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
    const { query, session } = req;

    try {
      const test = await connexion.userFollow.deleteMany({
        where: {
          AND: {
            follower_id: +session.user.id,
            follow_id: +query.id,
          },
        },
      });

      res.status(200).send({ success: true, data: test });
    } catch (e) {
      throw new ApiError(400, "you can't unfollow this user");
    }
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
