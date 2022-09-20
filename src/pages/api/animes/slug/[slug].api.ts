import { Get, Query, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import { animesMapper } from 'mappers';
import { animeModel } from 'models';

class AnimesSlugHandler extends ApiHandler {
  @Get()
  async findBySlug(@Query('slug') slug: string): Promise<AnimeSlugResponse> {
    const anime = await animeModel.findBySlug(slug);

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    return { success: true, anime: animesMapper.one(anime) };
  }
}

export default apiHandler(AnimesSlugHandler);
