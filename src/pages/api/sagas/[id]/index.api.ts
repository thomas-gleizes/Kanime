import { Get, ParseNumberPipe, Query } from 'next-api-decorators';
import { apiHandler } from 'services/handler.service';
import HttpStatus from 'resources/HttpStatus';
import { sagaModel } from 'models';
import { sagasMapper } from 'mappers';
import { ApiError } from 'errors';
import ApiHandler from 'class/ApiHandler';

class SagaHandler extends ApiHandler {
  @Get()
  async showById(@Query('id', ParseNumberPipe) id: number): Promise<ShowSagaResponse> {
    const saga = await sagaModel.findById(id);

    if (!saga) throw new ApiError(HttpStatus.NOT_FOUND, 'Saga not found');

    return { success: true, saga: sagasMapper.one(saga) };
  }
}

export default apiHandler(SagaHandler);
