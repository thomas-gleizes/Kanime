import { Patch, Body, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import { UserModel } from 'models';
import ApiHandler from 'class/ApiHandler';
import Security from 'services/security.service';

interface ResetPasswordInput {
  newPassword: string;
  confirmPassword: string;
  token: string;
}

class ResetPasswordHandler extends ApiHandler {
  @Patch()
  async resetPassword(@Body() body: ResetPasswordInput) {
    const user = await UserModel.checkResetPasswordToken(body.token);

    if (!user) throw new NotFoundException('token not found');

    await UserModel.resetPassword(
      user.id,
      Security.sha512(body.newPassword + user.username)
    );

    return { success: true };
  }
}

export default apiHandler(ResetPasswordHandler);
