import { Post, Body, HttpCode } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import Security from 'services/security.service';
import { Session } from 'decorators/session';
import HttpStatus from 'resources/HttpStatus';
import ApiHandler from 'class/ApiHandler';
import { ApiError } from 'errors';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';

interface RegisterInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class RegisterHandler extends ApiHandler {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(@Body() body: RegisterInput, @Session() session) {
    if (session) await session.destroy();

    const users = await UserModel.findByEmailOrUsername(body.email, body.username);

    if (users.length) {
      let key = 'email';
      if (users[0].username === body.username) key = 'username';
      throw new ApiError(HttpStatus.CONFLICT, `${key} already exist`);
    }

    const user = UsersMapper.one(
      await UserModel.create({
        username: body.username,
        email: body.email,
        password: Security.sha512(body.password + body.username),
      })
    );

    const token = Security.sign(user);

    session.user = user;
    session.token = token;
    await session.save();

    return { success: true, user: user, token: token };
  }
}

export default apiHandler(RegisterHandler);
