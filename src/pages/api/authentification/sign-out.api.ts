import { Get } from 'next-api-decorators'

import type { Session } from 'app/session'
import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { GetSession } from 'decorators'

class SignOutHandler extends ApiHandler {
  @Get()
  async get(@GetSession() session: Session): Promise<ApiResponse> {
    if (session) await session.destroy()

    return { success: true }
  }
}

export default handleApi(SignOutHandler)
