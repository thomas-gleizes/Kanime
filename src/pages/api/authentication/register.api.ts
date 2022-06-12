import { ApiRequest, ApiResponse } from 'next/app';
import Security from 'services/security.service';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { registerSchema } from 'resources/validations';
import { ApiError, SchemaError } from 'errors';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import HttpStatus from 'resources/HttpStatus';

const handler = apiHandler();

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
    let key = 'email';
    if (users[0].username === userData.username) key = 'username';
    throw new ApiError(HttpStatus.CONFLICT, `${key} already exist`);
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

  res.status(201).json({ success: true, user: user, token: token });
});

export default withSessionApi(handler);
