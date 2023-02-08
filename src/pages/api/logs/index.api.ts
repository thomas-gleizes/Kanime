import { Get, Query, ValidationPipe } from 'next-api-decorators'

import { handleApi } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { logsMapper } from 'mappers'
import { logModel } from 'models'
import { AdminGuard } from 'decorators'
import { QueryParamsDto } from 'dto'

class LogsHandler extends ApiHandler {
  @Get()
  @AdminGuard()
  async show(@Query(ValidationPipe) params: QueryParamsDto): Promise<LogsResponse> {
    const logs = await logModel.show(params)
    const total = await logModel.countTotal()

    return {
      success: true,
      meta: {
        total,
        count: logs.length
      },
      records: logsMapper.many(logs)
    }
  }
}

export default handleApi(LogsHandler)
