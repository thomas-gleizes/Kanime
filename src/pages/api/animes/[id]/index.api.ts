import { Get, NotFoundException, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import { animesMapper } from 'mappers';
import { animeModel } from 'models';

class AnimeHandler extends ApiHandler {
  @Get()
  async show(@Query('id', ParseNumberPipe) id: number): Promise<ShowAnimeResponse> {
    const anime = await animeModel.findById(id);

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    return { success: true, anime: animesMapper.one(anime) };
  }
}

export default apiHandler(AnimeHandler);
