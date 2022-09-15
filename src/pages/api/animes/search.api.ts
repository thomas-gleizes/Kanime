import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';
import { QueryParamsDto } from 'dto';

class AnimesSearchHandler extends ApiHandler {
  @Get()
  async search(
    @Query('query') query: string,
    @Query(ValidationPipe) params: QueryParamsDto
  ) {
    const animes = await AnimeModel.search(query, params);

    return { animes: AnimesMapper.many(animes) };
  }
}

export default apiHandler(AnimesSearchHandler);
