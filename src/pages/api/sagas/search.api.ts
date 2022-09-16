import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { sagasMapper } from 'mappers';
import { sagaModel } from 'models';

class SagaSearchHandler extends ApiHandler {
  @Get()
  async search(@Query(ValidationPipe) query: any) {
    const sagas = await sagaModel.search(query.query, { ...query });

    return { sagas: sagasMapper.many(sagas) };
  }
}

export default apiHandler(SagaSearchHandler);
