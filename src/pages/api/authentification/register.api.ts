import { Post, Body, HttpCode, ValidationPipe } from 'next-api-decorators'

import type { Session } from 'app/session'
import { apiHandler } from 'services/handler.service'
import Security from 'services/security.service'
import HttpStatus from 'resources/HttpStatus'
import ApiHandler from 'class/ApiHandler'
import { userModel } from 'models'
import { usersMapper } from 'mappers'
import { GetSession } from 'decorators'
import { RegisterDto } from 'dto'
import { BadRequestException } from 'exceptions/http'

class RegisterHandler extends ApiHandler {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async register(
    @Body(ValidationPipe) body: RegisterDto,
    @GetSession() session: Session
  ): Promise<RegisterResponse> {
    if (session) await session.destroy()

    const [foundUser] = await userModel.findByEmailOrUsername(body.email, body.username)

    if (foundUser) {
      let key = 'email'
      if (foundUser.username === body.username) key = 'username'
      throw new BadRequestException(`${key} already exist`)
    }

    const user = usersMapper.one(
      await userModel.create({
        username: body.username,
        email: body.email,
        password: Security.sha512(body.password + body.username)
      })
    )

    const token = Security.sign(user)

    session.user = user
    session.token = token
    await session.save()

    return { success: true, user, token }
  }
}

export default apiHandler(RegisterHandler)
