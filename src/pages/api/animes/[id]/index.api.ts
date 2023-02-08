import { Get, ParseNumberPipe, Query } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { errorMessage } from 'resources/constants'
import { animesMapper } from 'mappers'
import { animeModel } from 'models'
import { NotFoundException } from 'exceptions/http'

class AnimeHandler extends ApiHandler {
  @Get()
  async show(@Query('id', ParseNumberPipe) id: number): Promise<ShowAnimeResponse> {
    const anime = await animeModel.findById(id)

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND)

    return { success: true, anime: animesMapper.one(anime) }
  }
}

export default handleApi(AnimeHandler)
