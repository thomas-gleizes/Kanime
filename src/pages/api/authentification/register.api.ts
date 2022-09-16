import { Post, Body, HttpCode } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import Security from 'services/security.service';
import HttpStatus from 'resources/HttpStatus';
import ApiHandler from 'class/ApiHandler';
import { ApiError } from 'errors';
import { userModel } from 'models';
import { usersMapper } from 'mappers';
import { GetSession } from 'decorators';
import { RegisterDto } from 'dto';

class RegisterHandler extends ApiHandler {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(@Body() body: RegisterDto, @GetSession() session) {
    if (session) await session.destroy();

    const users = await userModel.findByEmailOrUsername(body.email, body.username);

    if (users.length) {
      let key = 'email';
      if (users[0].username === body.username) key = 'username';
      throw new ApiError(HttpStatus.CONFLICT, `${key} already exist`);
    }

    const user = usersMapper.one(
      await userModel.create({
        username: body.username,
        email: body.email,
        password: Security.sha512(body.password + body.username),
      })
    );

    const token = Security.sign(user);

    session.user = user;
    session.token = token;
    await session.save();

    return { success: true, user, token };
  }
}

export default apiHandler(RegisterHandler);
