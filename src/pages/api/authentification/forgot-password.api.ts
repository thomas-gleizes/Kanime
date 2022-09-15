import { Body, Patch, NotFoundException, BadRequestException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import { UserModel } from 'models';
import Security from 'services/security.service';
import { DAY } from 'resources/constants';
import { ForgotPasswordDto } from 'dto';

class ForgotPasswordHandler {
  @Patch()
  async post(@Body() body: ForgotPasswordDto) {
    const user = await UserModel.findByEmail(body.email);

    if (!user) throw new NotFoundException('email user not found');

    if (
      user.last_ask_reset_password &&
      user.last_ask_reset_password.getTime() + DAY > Date.now()
    )
      throw new BadRequestException(
        'you can ask to change your password only one time each 24 hours'
      );

    const hash = Security.sha512(user.password + user.username);
    await UserModel.updateResetPasswordToken(user.id, hash);

    //TODO SEND email with a new services for email

    return { success: true };
  }
}

export default apiHandler(ForgotPasswordHandler);
