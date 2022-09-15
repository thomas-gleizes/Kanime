import { Get, Query, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { SagasMapper } from 'mappers';
import { SagaModel } from 'models';

class SagaSlug extends ApiHandler {
  @Get()
  async findBySlug(@Query('slug') slug: string) {
    const saga = await SagaModel.findBySlug(slug);

    if (!saga) throw new NotFoundException('Saga not found');

    return { saga: SagasMapper.one(saga) };
  }
}

export default apiHandler(SagaSlug);
