import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { animesMapper } from 'mappers';
import { animeModel } from 'models';
import { QueryParamsDto } from 'dto';

class AnimesSearchHandler extends ApiHandler {
  @Get()
  async search(
    @Query('query') query: string,
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<AnimesSearchResponse> {
    const animes = await animeModel.search(query, params);

    return { success: true, animes: animesMapper.many(animes) };
  }
}

export default apiHandler(AnimesSearchHandler);
