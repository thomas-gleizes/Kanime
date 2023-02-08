import { Get, ParseNumberPipe, Query, ValidationPipe } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { errorMessage } from 'resources/constants'
import { userModel } from 'models'
import { usersMapper } from 'mappers'
import { QueryParamsDto } from 'dto'
import { NotFoundException } from 'exceptions/http'

class UserFollowerHandler extends ApiHandler {
  @Get()
  async showFollowers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) page: QueryParamsDto
  ): Promise<ShowUserFollowersResponse> {
    const user = await userModel.findById(id)
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND)

    const users = await userModel.findFollowers(id)

    return { success: true, followers: usersMapper.many(users) }
  }
}

export default handleApi(UserFollowerHandler)
