import { Get, Query, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { sagasMapper } from 'mappers';
import { sagaModel } from 'models';

class SagaSlug extends ApiHandler {
  @Get()
  async findBySlug(@Query('slug') slug: string) {
    const saga = await sagaModel.findBySlug(slug);

    if (!saga) throw new NotFoundException('Saga not found');

    return { saga: sagasMapper.one(saga) };
  }
}

export default apiHandler(SagaSlug);
