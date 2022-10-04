import { Body, Post, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import Security from 'services/security.service';
import { userModel } from 'models';
import { usersMapper } from 'mappers';
import { errorMessage } from 'resources/constants';
import { GetSession } from 'decorators';
import { SignInDto } from 'dto';
import { BadRequestException } from 'exceptions/http';

class SignInInHandler extends ApiHandler {
  @Post('/')
  async get(
    @Body(ValidationPipe) body: SignInDto,
    @GetSession() session
  ): Promise<SignInResponse> {
    if (session) await session.destroy();

    const user = await userModel.findByEmail(body.email);

    if (!user || !Security.compare(body.password + user.username, user.password))
      throw new BadRequestException(errorMessage.AUTH_LOGIN);

    const mappedUser = usersMapper.one(user);

    const token = Security.sign(mappedUser, body.rememberMe);

    session.user = mappedUser;
    session.token = token;

    await session.save();

    return { success: true, user: mappedUser, token };
  }
}

export default apiHandler(SignInInHandler);
