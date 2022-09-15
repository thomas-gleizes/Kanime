import {
  Delete,
  Get,
  HttpCode,
  ParseNumberPipe,
  Post,
  Query,
  BadRequestException,
  NotFoundException,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { UserFollowModel, UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { ApiError } from 'errors';
import { GetSession, AuthGuard } from 'decorators';

class UserFollowHandler extends ApiHandler {
  @Get()
  async showFollow(@Query('id', ParseNumberPipe) id: number) {
    const user = await UserModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const followers = await UserModel.findFollows(user.id);

    return { followers: UsersMapper.many(followers) };
  }

  @Post()
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async follow(@Query('id', ParseNumberPipe) id: number, @GetSession() session: any) {
    const user = await UserModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    try {
      const follow = await UserFollowModel.create(session.user.id, user.id);

      return { follow };
    } catch (e) {
      throw new BadRequestException(errorMessage.FOLLOW);
    }
  }

  @Delete()
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(@Query('id', ParseNumberPipe) id: number, @GetSession() session: any) {
    const user = await UserModel.findById(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    try {
      await UserFollowModel.delete(session.user.id, id);
    } catch (e) {
      throw new ApiError(HttpStatus.BAD_REQUEST, errorMessage.UNFOLLOW);
    }
  }
}

export default apiHandler(UserFollowHandler);
