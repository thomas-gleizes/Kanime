import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import Security from 'services/security.service';
import { UserModel } from 'models';
import { UsersMapper } from 'mapper';
import { signInSchema } from 'ressources/validations';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';
import SchemaError from 'class/error/SchemaError';

interface Data extends DefaultResponse {
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

  res.send({ success: true, user, token });
});

export default withSessionApi(handler);
