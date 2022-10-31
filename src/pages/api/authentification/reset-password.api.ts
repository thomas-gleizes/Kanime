import { Patch, Body, ValidationPipe } from 'next-api-decorators'

import { apiHandler } from 'services/handler.service'
import { userModel } from 'models'
import ApiHandler from 'class/ApiHandler'
import Security from 'services/security.service'
import { ResetPasswordDto } from 'dto'
import { NotFoundException } from 'exceptions/http'

class ResetPasswordHandler extends ApiHandler {
  @Patch()
  async resetPassword(
    @Body(ValidationPipe) body: ResetPasswordDto
  ): Promise<ApiResponse> {
    const user = await userModel.checkResetPasswordToken(body.token)

    if (!user) throw new NotFoundException('token not found')

    await userModel.resetPassword(
      user.id,
      Security.sha512(body.newPassword + user.username)
    )

    return { success: true }
  }
}

export default apiHandler(ResetPasswordHandler)
