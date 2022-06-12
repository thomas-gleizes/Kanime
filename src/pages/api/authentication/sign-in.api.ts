import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import Security from 'services/security.service';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { signInSchema } from 'resources/validations';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { ApiError, SchemaError } from 'errors';

const handler = apiHandler();

handler.post(async (req: ApiRequest, res: ApiResponse<SignInResponse>) => {
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
    throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.AUTH_LOGIN);
  }

  const token = Security.sign(user, body.rememberMe);

  session.user = user;
  session.token = token;

  await session.save();

  res.json({ success: true, user, token });
});

export default withSessionApi(handler);
