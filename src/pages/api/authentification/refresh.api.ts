import { Get } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import ApiHandler from 'class/ApiHandler';
import { GetSession, AuthGuard } from 'decorators';

class RefreshHandler extends ApiHandler {
  @Get()
  @AuthGuard()
  async refresh(@GetSession() session) {
    const user = await UserModel.findById(session.user.id);

    return { success: true, user: UsersMapper.one(user) };
  }
}

export default apiHandler(RefreshHandler);
