import {
  Get,
  ParseNumberPipe,
  Query,
  ValidationPipe,
  NotFoundException,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import { userModel } from 'models';
import { usersMapper } from 'mappers';
import { QueryParamsDto } from 'dto';

class UserFollowerHandler extends ApiHandler {
  @Get()
  async showFollowers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) page: QueryParamsDto
  ): Promise<ShowUserFollowersResponse> {
    const user = await userModel.findById(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const users = await userModel.findFollowers(id);

    return { success: true, followers: usersMapper.many(users) };
  }
}

export default apiHandler(UserFollowerHandler);
