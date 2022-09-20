import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { sagasMapper } from 'mappers';
import { sagaModel } from 'models';
import { QueryParamsDto } from 'dto/global.dto';

class SagaSearchHandler extends ApiHandler {
  @Get()
  async search(
    @Query('query') query: string,
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<SearchSagasResponse> {
    const sagas = await sagaModel.search(query, params);

    return { success: true, sagas: sagasMapper.many(sagas) };
  }
}

export default apiHandler(SagaSearchHandler);
