import { Get } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import ApiHandler from 'class/ApiHandler';
import { Session } from 'decorators/session';
import { AuthGuard } from 'decorators/authGuard';

class RefreshHandler extends ApiHandler {
  @Get()
  @AuthGuard()
  async refresh(@Session() session) {
    const user = await UserModel.findById(session.user.id);

    return { success: true, user: UsersMapper.one(user) };
  }
}

export default apiHandler(RefreshHandler);
