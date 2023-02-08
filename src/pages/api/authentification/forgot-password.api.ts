import { Body, Patch, ValidationPipe } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import { userModel } from 'models'
import Security from 'services/security.service'
import { ForgotPasswordDto } from 'dto'

class ForgotPasswordHandler {
  @Patch()
  async post(@Body(ValidationPipe) body: ForgotPasswordDto): Promise<ApiResponse> {
    const user = await userModel.findByEmail(body.email)

    if (!user) return { success: true }

    const hash = Security.sha512(user.password + user.username + Math.random())
    await userModel.updateResetPasswordToken(user.id, hash)

    //TODO SEND email with a new services for email

    return { success: true }
  }
}

export default handleApi(ForgotPasswordHandler)
