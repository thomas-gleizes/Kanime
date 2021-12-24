import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '@lib/routing/router';
import Security from '@lib/security';
import { UserModel } from '@models';
import { UsersResources } from '@resources';
import { withSessionApi } from '@lib/session';
import { ApiError } from '@errors';
import { defaultUsersMedia } from '@lib/routing/routes';


interface Data extends DefaultResponseData {
  user: User;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body: userData } = req;

  const users = await UserModel.findByEmailOrLogin(userData.email, userData.login);

  if (users.length) {
    let key = 'login';
    if (users[0].email === userData.email) key = 'email';

    throw new ApiError(400, `${key} already exist`);
  }

  const [user] = UsersResources.one(
    await UserModel.create({
      login: userData.login,
      email: userData.email,
      password: await Security.hash(userData.password),
      background_path: defaultUsersMedia.background,
      avatar_path: defaultUsersMedia.avatar
    })
  );

  req.session.user = user;
  await req.session.save();

  user.token = Security.sign(user);

  res.status(201).send({ success: true, user: user });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
