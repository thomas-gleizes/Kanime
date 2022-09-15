import { Get, NotFoundException, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';

class AnimeHandler extends ApiHandler {
  @Get()
  async show(@Query('id', ParseNumberPipe) id: number) {
    const anime = await AnimeModel.findById(id);

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    return { anime: AnimesMapper.one(anime) };
  }
}

export default apiHandler(AnimeHandler);
