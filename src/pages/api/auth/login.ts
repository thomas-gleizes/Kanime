import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import router from '@lib/routing/router';
import Security from '@services/security';
import { withSessionApi } from '@services/session';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError, SchemaError } from '@errors';
// import { loginSchema } from '@validations/users';

interface Data extends DefaultResponseData {
  user: User;
}

router.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body } = req;

  // const error = await loginSchema.validate(body).catch((error) => error);
  // console.log('Error', error);
  //
  // if (error) throw new SchemaError(400, error);

  if (req.session) await req.session.destroy();

  const [user, hash]: [User, string] = UsersMapper.one(
    await UserModel.findByEmail(body.email)
  );

  if (!user || !(await Security.compare(body.password, hash))) {
    throw new ApiError(400, 'email/password wrong');
  }

  user.token = Security.sign(user);

  req.session.user = user;
  await req.session.save();

  res.send({ success: true, user });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
