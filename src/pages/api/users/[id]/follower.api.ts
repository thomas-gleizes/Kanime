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
import { UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';
import { QueryParamsDto } from 'dto';

class UserFollowerHandler extends ApiHandler {
  @Get()
  async showFollowers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) page: QueryParamsDto
  ) {
    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const users = await UserModel.findFollowers(id);

    return { users: UsersMapper.many(users) };
  }
}

export default apiHandler(UserFollowerHandler);
