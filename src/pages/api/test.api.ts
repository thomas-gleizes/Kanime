import { Get, Post } from 'next-api-decorators'

import ApiHandler from 'class/ApiHandler'
import { apiHandler } from 'services/handler.service'

class TestApiHandler extends ApiHandler {
  @Get()
  show() {
    return { success: true, name: 'John Doe' }
  }

  @Post()
  create() {
    return { success: true, name: 'Janne Doe' }
  }
}

export default apiHandler(TestApiHandler)
