import { Body, Patch, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import { userModel } from 'models';
import Security from 'services/security.service';
import { DAY } from 'resources/constants';
import { ForgotPasswordDto } from 'dto';
import { BadRequestException, NotFoundException } from 'exceptions/http';

class ForgotPasswordHandler {
  @Patch()
  async post(@Body(ValidationPipe) body: ForgotPasswordDto): Promise<ApiResponse> {
    const user = await userModel.findByEmail(body.email);

    if (!user) throw new NotFoundException('email user not found');

    if (
      user.lastAskResetPassword &&
      user.lastAskResetPassword.getTime() + DAY > Date.now()
    )
      throw new BadRequestException(
        'you can ask to change your password only one time each 24 hours'
      );

    const hash = Security.sha512(user.password + user.username);
    await userModel.updateResetPasswordToken(user.id, hash);

    //TODO SEND email with a new services for email

    return { success: true };
  }
}

export default apiHandler(ForgotPasswordHandler);
