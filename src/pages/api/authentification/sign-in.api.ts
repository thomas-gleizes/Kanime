import { Body, Post } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import Security from 'services/security.service';
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';
import { Session } from 'decorators';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { SignInDto } from 'dto/authentifications.dto';

class SignInInHandler extends ApiHandler {
  @Post()
  async get(@Body() body: SignInDto, @Session() session: any) {
    if (session) await session.destroy();

    const user = await UserModel.findByEmail(body.email);

    if (!user || !Security.compare(body.password + user.username, user.password))
      throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.AUTH_LOGIN);

    const mappedUser = UsersMapper.one(user);

    const token = Security.sign(mappedUser, body.rememberMe);

    session.user = mappedUser;
    session.token = token;

    await session.save();

    return { success: true, user: mappedUser, token };
  }
}

export default apiHandler(SignInInHandler);
