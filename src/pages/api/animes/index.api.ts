import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { animeModel } from 'models';
import { animesMapper } from 'mappers';
import { QueryParamsDto } from 'dto';

class AnimesHandler extends ApiHandler {
  @Get()
  async showAll(
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<AnimesListResponse> {
    const animes = await animeModel.all(params);

    return { success: true, animes: animesMapper.many(animes) };
  }
}

export default apiHandler(AnimesHandler);
