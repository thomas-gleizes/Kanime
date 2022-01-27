import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '@lib/routing/router';
import Security from '@services/security';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { withSessionApi } from '@services/session';
import { ApiError, SchemaError } from '@errors';
// import { registerSchema } from '@validations/users';

interface Data extends DefaultResponseData {
  user: User;
  token: string;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body: userData, session } = req;

  // const error = await registerSchema.validate(userData).catch((error) => error);
  // if (error) throw new SchemaError(400, error);

  session.destroy();

  const users = await UserModel.findByEmailOrLogin(userData.email, userData.login);

  if (users.length) {
    let key = 'login';
    if (users[0].email === userData.email) key = 'email';

    throw new ApiError(400, `${key} already Fexist`);
  }

  const [user] = UsersMapper.one(
    await UserModel.create({
      login: userData.login,
      email: userData.email,
      password: await Security.hash(userData.password + userData.login),
    })
  );

  const token = Security.sign(user);

  session.user = user;
  session.token = token;
  await session.save();

  res.status(201).send({ success: true, user: user, token: token });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
