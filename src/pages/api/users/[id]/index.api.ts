import { Get, NotFoundException, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { UsersMapper } from 'mappers';
import { UserModel } from 'models';
import { errorMessage } from 'resources/constants';

class UserHandler extends ApiHandler {
  @Get()
  async get(@Query('id', ParseNumberPipe) id: number) {
    const user = await UserModel.findById(+id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    return { user: UsersMapper.one(user) };
  }
}

export default apiHandler(UserHandler);
