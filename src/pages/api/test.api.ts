import { Get, HttpCode, Post } from 'next-api-decorators'

import ApiHandler from 'class/ApiHandler'
import { apiHandler } from 'services/handler.service'
import httpStatus from 'resources/HttpStatus'

class TestApiHandler extends ApiHandler {
  @Get()
  show() {
    return { success: true, name: 'John Doe' }
  }

  @HttpCode(httpStatus.CREATED)
  @Post()
  create() {
    return { success: true, name: 'Janne Doe' }
  }
}

export default apiHandler(TestApiHandler)
