import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import Security from 'services/security.service';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { signInSchema } from 'resources/validations';
import { errorMessage } from 'resources/constants';
import { ApiError, SchemaError } from 'class/error';

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
    throw new ApiError(400, errorMessage.AUTH_LOGIN);
  }

  const token = Security.sign(user, body.rememberMe);

  session.user = user;
  session.token = token;

  await session.save();

  res.json({ success: true, user, token });
});

export default withSessionApi(handler);
