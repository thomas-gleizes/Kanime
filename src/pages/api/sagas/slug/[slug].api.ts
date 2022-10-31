import { Get, Query } from 'next-api-decorators'

import { apiHandler } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'
import { sagasMapper } from 'mappers'
import { sagaModel } from 'models'
import { NotFoundException } from 'exceptions/http'

class SagaSlug extends ApiHandler {
  @Get()
  async findBySlug(@Query('slug') slug: string): Promise<ShowSagaResponse> {
    const saga = await sagaModel.findBySlug(slug)

    if (!saga) throw new NotFoundException('Saga not found')

    return { success: true, saga: sagasMapper.one(saga) }
  }
}

export default apiHandler(SagaSlug)
