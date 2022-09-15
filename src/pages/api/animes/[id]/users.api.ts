import {
  Get,
  NotFoundException,
  ParseNumberPipe,
  Query,
  ValidationPipe,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import { AnimeModel, UserModel } from 'models';
import { UsersMapper } from 'mappers';
import { QueryParamsDto } from 'dto';

class AnimesUserHandler extends ApiHandler {
  @Get()
  async showUsers(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) params: QueryParamsDto
  ) {
    const anime = await AnimeModel.findById(id);
    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    const users = await UserModel.findByAnime(id, params);

    return { users: UsersMapper.many(users) };
  }
}

export default apiHandler(AnimesUserHandler);
