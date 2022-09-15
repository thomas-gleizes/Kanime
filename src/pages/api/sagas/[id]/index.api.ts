import { Get, ParseNumberPipe, Query } from 'next-api-decorators';
import { apiHandler } from 'services/handler.service';
import HttpStatus from 'resources/HttpStatus';
import { SagaModel } from 'models';
import { SagasMapper } from 'mappers';
import { ApiError } from 'errors';
import ApiHandler from 'class/ApiHandler';

class SagaHandler extends ApiHandler {
  @Get()
  async showById(@Query('id', ParseNumberPipe) id: number) {
    const saga = await SagaModel.findById(id);

    if (!saga) throw new ApiError(HttpStatus.NOT_FOUND, 'Saga not found');

    return { saga: SagasMapper.one(saga) };
  }
}

export default apiHandler(SagaHandler);
