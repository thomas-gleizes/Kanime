import { Get, ParseNumberPipe, Query, ValidationPipe } from 'next-api-decorators'

import { apiHandler } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { errorMessage } from 'resources/constants'
import { animeModel, userModel } from 'models'
import { usersMapper } from 'mappers'
import { QueryParamsDto } from 'dto'
import { NotFoundException } from 'exceptions/http'

class AnimesUserHandler extends ApiHandler {
  @Get()
  async showUsers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<AnimeUserResponse> {
    const anime = await animeModel.findById(id)
    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND)

    const users = await userModel.findByAnime(id, params)

    return { success: true, users: usersMapper.many(users) }
  }
}

export default apiHandler(AnimesUserHandler)
