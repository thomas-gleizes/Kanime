import { Get, Query, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { UserModel } from 'models';
import { errorMessage } from 'resources/constants';
import { UsersMapper } from 'mappers';

class UserSlugHandler extends ApiHandler {
  @Get()
  async get(@Query('slug') slug: string) {
    const user = await UserModel.findBySlug(slug);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    return { user: UsersMapper.one(user) };
  }
}

export default apiHandler(UserSlugHandler);
