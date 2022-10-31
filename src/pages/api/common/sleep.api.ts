import { Get, Query } from 'next-api-decorators'

import { apiHandler } from 'services/handler.service'
import ApiHandler from 'class/ApiHandler'

class SleepHandler extends ApiHandler {
  @Get()
  async sleep(@Query('time') time: number) {
    if (process.env.NODE_ENV !== 'production')
      await new Promise((resolve) => setTimeout(resolve, time || 2000))

    return { success: true }
  }
}

export default apiHandler(SleepHandler)
