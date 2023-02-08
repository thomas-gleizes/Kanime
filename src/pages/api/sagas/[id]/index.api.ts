import { Get, ParseNumberPipe, Query } from 'next-api-decorators'
import { handleApi } from 'services/handler.service'
import { sagaModel } from 'models'
import { sagasMapper } from 'mappers'
import ApiHandler from 'class/ApiHandler'
import { NotFoundException } from 'exceptions/http'

class SagaHandler extends ApiHandler {
  @Get()
  async showById(@Query('id', ParseNumberPipe) id: number): Promise<ShowSagaResponse> {
    const saga = await sagaModel.findById(id)

    if (!saga) throw new NotFoundException('Saga not found')

    return { success: true, saga: sagasMapper.one(saga) }
  }
}

export default handleApi(SagaHandler)
