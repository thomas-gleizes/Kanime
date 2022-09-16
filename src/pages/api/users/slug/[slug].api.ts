import { Get, Query, NotFoundException } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { userModel } from 'models';
import { errorMessage } from 'resources/constants';
import { usersMapper } from 'mappers';

class UserSlugHandler extends ApiHandler {
  @Get()
  async get(@Query('slug') slug: string) {
    const user = await userModel.findBySlug(slug);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    return { user: usersMapper.one(user) };
  }
}

export default apiHandler(UserSlugHandler);
