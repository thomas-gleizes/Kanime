import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { SagasMapper } from 'mappers';
import { SagaModel } from 'models';

class SagaSearchHandler extends ApiHandler {
  @Get()
  async search(@Query(ValidationPipe) query: any) {
    const sagas = await SagaModel.search(query.query, { ...query });

    return { sagas: SagasMapper.many(sagas) };
  }
}

export default apiHandler(SagaSearchHandler);
