import { Get } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { GetSession } from 'decorators';

class SignOutHandler extends ApiHandler {
  @Get()
  get(@GetSession() session) {
    if (session) session.destroy();

    return { success: true };
  }
}

export default apiHandler(SignOutHandler);
