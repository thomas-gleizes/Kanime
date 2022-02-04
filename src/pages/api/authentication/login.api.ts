import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '@lib/routing/router';
import Security from '@services/security';
import { withSessionApi } from '@services/session';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError, SchemaError } from '@errors';
import { errorMessage } from '@lib/constants';
// import { loginSchema } from '@validations/users';

interface Data extends DefaultResponseData {
  user: User;
  token: string;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body, session } = req;

  // const error = await loginSchema.validate(body).catch((error) => error);
  // console.log('Error', error);
  //
  // if (error) throw new SchemaError(400, error);

  if (session) await session.destroy();

  const [user, hash]: [User, string] = UsersMapper.one(
    await UserModel.findByEmail(body.email)
  );

  if (!user || !(await Security.compare(body.password + user.login, hash))) {
    throw new ApiError(400, errorMessage.AUTH_LOGIN);
  }

  const token = Security.sign(user);

  session.user = user;
  session.token = token;

  await session.save();

  res.send({ success: true, user: user, token: token });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
