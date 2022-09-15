import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';
import { QueryParamsDto } from 'dto';

class AnimesHandler extends ApiHandler {
  @Get()
  async showAll(@Query(ValidationPipe) params: QueryParamsDto) {
    const animes = await AnimeModel.all(params);

    return { animes: AnimesMapper.many(animes) };
  }
}

export default apiHandler(AnimesHandler);
