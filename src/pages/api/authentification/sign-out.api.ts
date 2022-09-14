import { Get } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { Session } from 'decorators/session';

class SignOutHandler extends ApiHandler {
  @Get()
  get(@Session() session) {
    if (session) session.destroy();

    return { success: true };
  }
}

export default apiHandler(SignOutHandler);
