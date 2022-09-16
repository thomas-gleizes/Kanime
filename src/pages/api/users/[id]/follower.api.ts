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
import HttpStatus from 'resources/HttpStatus';
import { userModel } from 'models';
import { usersMapper } from 'mappers';
import { ApiError } from 'errors';
import { QueryParamsDto } from 'dto';

class UserFollowerHandler extends ApiHandler {
  @Get()
  async showFollowers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) page: QueryParamsDto
  ) {
    const user = await userModel.findById(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const users = await userModel.findFollowers(id);

    return { users: usersMapper.many(users) };
  }
}

export default apiHandler(UserFollowerHandler);
