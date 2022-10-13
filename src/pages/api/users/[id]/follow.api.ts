import { Delete, Get, HttpCode, ParseNumberPipe, Post, Query } from 'next-api-decorators';

import type { Session } from 'app/session';
import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { userFollowModel, userModel } from 'models';
import { usersMapper } from 'mappers';
import { GetSession, AuthGuard } from 'decorators';
import { NotFoundException, BadRequestException } from 'exceptions/http';

class UserFollowHandler extends ApiHandler {
  @Get()
  async showFollow(
    @Query('id', ParseNumberPipe) id: number
  ): Promise<ShowUserFollowsResponse> {
    const user = await userModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const followers = await userModel.findFollows(user.id);

    return { success: true, follows: usersMapper.many(followers) };
  }

  @Post()
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async follow(
    @Query('id', ParseNumberPipe) id: number,
    @GetSession() session: Session
  ): Promise<CreateFollowResponse> {
    const user = await userModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    try {
      const follow = await userFollowModel.create(session.user.id, user.id);

      return { success: true, follow };
    } catch (e) {
      throw new BadRequestException(errorMessage.FOLLOW);
    }
  }

  @Delete()
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfollow(
    @Query('id', ParseNumberPipe) id: number,
    @GetSession() session: any
  ): Promise<ApiResponse> {
    const user = await userModel.findById(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    try {
      await userFollowModel.delete(session.user.id, id);

      return { success: true };
    } catch (e) {
      throw new BadRequestException(errorMessage.UNFOLLOW);
    }
  }
}

export default apiHandler(UserFollowHandler);
