import ApiHandler from 'class/ApiHandler';
import { Get, Query, ValidationPipe } from 'next-api-decorators';
import { QueryParamsDto } from 'dto/global.dto';
import { sagaModel } from 'models';
import { apiHandler } from 'services/handler.service';
import { sagasMapper } from 'mappers';

class SagasHandler extends ApiHandler {
  @Get()
  async show(
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<ShowSagasListResponse> {
    const sagas = await sagaModel.all(params);

    return { success: true, sagas: sagasMapper.many(sagas) };
  }
}

export default apiHandler(SagasHandler);
