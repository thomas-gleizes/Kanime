import { Get, Query } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { userModel } from 'models'
import { errorMessage } from 'resources/constants'
import { usersMapper } from 'mappers'
import { NotFoundException } from 'exceptions/http'

class UserSlugHandler extends ApiHandler {
  @Get()
  async get(@Query('slug') slug: string): Promise<ShowUserResponse> {
    const user = await userModel.findBySlug(slug)

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND)

    return { success: true, user: usersMapper.one(user) }
  }
}

export default handleApi(UserSlugHandler)
