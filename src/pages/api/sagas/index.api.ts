import { Get, Query, ValidationPipe } from 'next-api-decorators'

import ApiHandler from 'class/ApiHandler'
import { apiHandler } from 'services/handler.service'
import { sagaModel } from 'models'
import { sagasMapper } from 'mappers'
import { QueryParamsDto } from 'dto'

class SagasHandler extends ApiHandler {
  @Get()
  async show(@Query(ValidationPipe) params: QueryParamsDto): Promise<ShowSagasListResponse> {
    const sagas = await sagaModel.all(params)

    return { success: true, sagas: sagasMapper.many(sagas) }
  }
}

export default apiHandler(SagasHandler)
