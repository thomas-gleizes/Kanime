import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import { verifyUser, withSessionApi } from '@lib/session';
import router from '@lib/router/router';
import connexion from '@lib/connexion';
import { UsersResources } from '@resources';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {
  user: User;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const [user] = UsersResources.one(
    await connexion.user.findUnique({
      where: { id: +id },
    })
  );

  if (!user) throw new ApiError(404, 'user not found');

  res.send({ success: true, user });
});

router.post(verifyUser, (req: NextApiRequest, res: NextApiResponse) => {
  res.status(201).send({ success: true, user: undefined });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
