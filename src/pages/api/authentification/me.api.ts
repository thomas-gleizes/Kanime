import { Get } from 'next-api-decorators'

import type { Session } from 'app/session'
import { apiHandler } from 'services/handler.service'
import { usersMapper } from 'mappers'
import { userModel } from 'models'
import ApiHandler from 'class/ApiHandler'
import { GetSession, AuthGuard } from 'decorators'
import { NotFoundException } from 'exceptions/http'
import { errorMessage } from 'resources/constants'

class AuthProfilHandler extends ApiHandler {
  @Get()
  @AuthGuard()
  async refresh(@GetSession() session: Session): Promise<RefreshUserResponse> {
    const user = await userModel.findById(session.user.id)

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND)

    return { success: true, user: usersMapper.one(user) }
  }
}

export default apiHandler(AuthProfilHandler)
