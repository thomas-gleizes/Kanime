import ApiHandler from 'class/ApiHandler';
import { Get, Query, ValidationPipe } from 'next-api-decorators';
import { QueryParamsDto } from 'dto/global.dto';
import { SagaModel } from 'models';
import { apiHandler } from 'services/handler.service';

class SagasHandler extends ApiHandler {
  @Get()
  async show(@Query(ValidationPipe) params: QueryParamsDto) {
    const sagas = SagaModel.all(params);

    return { sagas };
  }
}

export default apiHandler(SagasHandler);
