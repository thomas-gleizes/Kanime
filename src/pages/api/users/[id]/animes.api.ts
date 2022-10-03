import {
  Get,
  Query,
  ParseNumberPipe,
  ValidationPipe,
} from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { animeModel, userModel } from 'models';
import { animesMapper } from 'mappers';
import { errorMessage } from 'resources/constants';
import { QueryParamsDto } from 'dto';
import { NotFoundException } from 'exceptions/http';

class UserAnimesHandler extends ApiHandler {
  @Get()
  async get(
    @Query('id', ParseNumberPipe) id: number,
    @Query(ValidationPipe) query: QueryParamsDto
  ): Promise<ShowUserAnimesResponse> {
    const user = await userModel.findById(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    const animes = await animeModel.findByUser(id);

    return { success: true, animes: animesMapper.many(animes) };
  }
}

export default apiHandler(UserAnimesHandler);
