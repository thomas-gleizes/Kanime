import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '@lib/routing/router';
import Security from '@services/security';
import { UserModel } from '@models';
import { UsersResources } from '@resources';
import { withSessionApi } from '@services/session';
import { ApiError, SchemaError } from '@errors';
import { registerSchema } from '@validations/users';

interface Data extends DefaultResponseData {
  user: User;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body: userData } = req;

  const error = await registerSchema.validate(userData).catch((error) => error);
  if (error) throw new SchemaError(400, error);

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
