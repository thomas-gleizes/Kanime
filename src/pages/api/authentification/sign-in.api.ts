import { Body, Post, ValidationPipe } from 'next-api-decorators'

import type { Session } from 'app/session'
import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import Security from 'services/security.service'
import { userModel } from 'models'
import { usersMapper } from 'mappers'
import { errorMessage } from 'resources/constants'
import { GetSession } from 'decorators'
import { SignInDto } from 'dto'
import { UnauthorizedException } from 'exceptions/http'

class SignInInHandler extends ApiHandler {
  @Post('/')
  async get(
    @Body(ValidationPipe) body: SignInDto,
    @GetSession() session: Session
  ): Promise<SignInResponse> {
    if (session) await session.destroy()

    const user = await userModel.findByEmail(body.email)

    if (!user || !Security.compare(body.password + user.username, user.password))
      throw new UnauthorizedException(errorMessage.AUTH_LOGIN)

    const mappedUser = usersMapper.one(user)

    const token = Security.sign(mappedUser, body.rememberMe)

    session.user = mappedUser
    session.token = token

    await session.save()

    return { success: true, user: mappedUser, token }
  }
}

export default handleApi(SignInInHandler)
