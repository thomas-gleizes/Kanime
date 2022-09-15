import { Get, Query, ValidationPipe } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { LogsMapper } from 'mappers';
import { LogModel } from 'models';
import { AuthAdminGuard } from 'decorators';
import { QueryParamsDto } from 'dto';

class LogsHandler extends ApiHandler {
  @Get()
  @AuthAdminGuard()
  async show(@Query(ValidationPipe) params: QueryParamsDto) {
    const logs = await LogModel.show(params);

    return { logs: LogsMapper.many(logs) };
  }
}

export default apiHandler(LogsHandler);
