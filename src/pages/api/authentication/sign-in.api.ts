import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, User } from '@types';
import handler from '@lib/routing';
import Security from '@services/security';
import { withSessionApi } from '@services/session';
import { UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError, SchemaError } from '@errors';
import { errorMessage } from '@lib/constants';
import { signInSchema } from '@validations/users';

interface Data extends DefaultResponseData {
  user: User;
  token: string;
}

handler.post(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { body, session } = req;

  try {
    await signInSchema.validate(body);
  } catch (err) {
    throw new SchemaError(err);
  }

  if (session) await session.destroy();

  const [user, hash]: [User, string] = UsersMapper.one(
    await UserModel.findByEmail(body.email)
  );

  if (!user || !Security.compare(body.password + user.username, hash)) {
    throw new ApiError(400, errorMessage.AUTH_LOGIN);
  }

  const token = Security.sign(user);

  session.user = user;
  session.token = token;

  await session.save();

  res.send({ success: true, user: user, token: token });
});

export default withSessionApi(handler);
