import { Get, Query } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { animesMapper } from 'mappers'
import { animeModel } from 'models'
import { errorMessage } from 'resources/constants'
import { NotFoundException } from 'exceptions/http'

class AnimesSlugHandler extends ApiHandler {
  @Get()
  async findBySlug(@Query('slug') slug: string): Promise<AnimeSlugResponse> {
    const anime = await animeModel.findBySlug(slug)

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND)

    return { success: true, anime: animesMapper.one(anime) }
  }
}

export default handleApi(AnimesSlugHandler)
