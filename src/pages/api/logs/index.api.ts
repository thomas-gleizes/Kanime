import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { logsMapper } from 'mappers';
import { logModel } from 'models';
import { AuthAdminGuard } from 'decorators';
import { QueryParamsDto } from 'dto';

class LogsHandler extends ApiHandler {
  @Get()
  @AuthAdminGuard()
  async show(@Query(ValidationPipe) params: QueryParamsDto) {
    const logs = await logModel.show(params);

    return { logs: logsMapper.many(logs) };
  }
}

export default apiHandler(LogsHandler);
