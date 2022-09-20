import { Get, NotFoundException, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { usersMapper } from 'mappers';
import { userModel } from 'models';
import { errorMessage } from 'resources/constants';

class UserHandler extends ApiHandler {
  @Get()
  async get(@Query('id', ParseNumberPipe) id: number): Promise<ShowUserResponse> {
    const user = await userModel.findById(+id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    return { success: true, user: usersMapper.one(user) };
  }
}

export default apiHandler(UserHandler);
