import {
  Get,
  Query,
  ParseNumberPipe,
  ValidationPipe,
  NotFoundException,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { AnimeModel, UserModel } from 'models';
import { AnimesMapper } from 'mappers';
import { errorMessage } from 'resources/constants';
import { QueryParamsDto } from 'dto';

class UserAnimesHandler extends ApiHandler {
  @Get()
  async get(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) query: QueryParamsDto
  ) {
    const user = await UserModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const animes = await AnimeModel.findByUser(id);

    return { animes: AnimesMapper.many(animes) };
  }
}

export default apiHandler(UserAnimesHandler);
