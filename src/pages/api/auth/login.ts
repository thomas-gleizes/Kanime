import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '../../../lib/routing/router';
import { withSessionApi } from '@services/session';
import { UserModel } from '@models';
import { UsersResources } from '@resources';
import { ApiError } from '@errors';
import Security from '@services/security';

interface Data extends DefaultResponseData {
  user: User;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const {
    body: { email, password },
  } = req;

  if (req.session) await req.session.destroy();

  const [user, hash]: [User, string] = UsersResources.one(
    await UserModel.findByEmail(email)
  );

  if (!user || !(await Security.compare(password, hash))) {
    throw new ApiError(401, 'email/password wrong');
  }

  user.token = Security.sign(user);

  req.session.user = user;
  await req.session.save();

  res.send({ success: true, user });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
