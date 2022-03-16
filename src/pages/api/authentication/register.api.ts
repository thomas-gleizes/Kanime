import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { registerSchema } from 'resources/validations';
import SchemaError from 'class/error/SchemaError';
import { UserModel } from 'models';
import ApiError from 'class/error/ApiError';
import { UsersMapper } from 'mapper';
import Security from 'services/security.service';
import { withSessionApi } from 'services/session.service';

handler.post(async (req: ApiRequest, res: ApiResponse<RegisterResponse>) => {
  const { body: userData, session } = req;

  try {
    await registerSchema.validate(userData);
  } catch (err) {
    throw new SchemaError(err);
  }

  session.destroy();

  const users = await UserModel.findByEmailOrUsername(userData.email, userData.username);

  if (users.length) {
    let key = 'username';
    if (users[0].email === userData.email) key = 'email';

    throw new ApiError(409, `${key} already exist`);
  }

  const [user] = UsersMapper.one(
    await UserModel.create({
      username: userData.username,
      email: userData.email,
      password: Security.sha256(userData.password + userData.username),
    })
  );

  const token = Security.sign(user);

  session.user = user;
  session.token = token;
  await session.save();

  res.status(201).send({ success: true, user: user, token: token });
});

export default withSessionApi(handler);
