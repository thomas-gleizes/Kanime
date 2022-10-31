import { Get, Query, ValidationPipe } from 'next-api-decorators'

import { apiHandler } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { usersMapper } from 'mappers'
import { userModel } from 'models'
import { QueryParamsDto } from 'dto'

class SearchUserHandler extends ApiHandler {
  @Get()
  async search(
    @Query('query') query: string,
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<SearchUserResponse> {
    const users = await userModel.search(query, params)

    return { success: true, users: usersMapper.many(users) }
  }
}

export default apiHandler(SearchUserHandler)
