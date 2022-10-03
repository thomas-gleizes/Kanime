import {
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  ValidationPipe
} from 'next-api-decorators';
import { EntryStatus } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { animeModel, entryModel } from 'models';
import { animesMapper, entriesMapper } from 'mappers';
import { AuthGuard, GetSession } from 'decorators';
import { CreateEntryDto, QueryParamsDto } from 'dto';
import { NotFoundException } from 'exceptions/http';

class EntriesHandler extends ApiHandler {
  @Get()
  async showAll(
    @Query(ValidationPipe) params: QueryParamsDto
  ): Promise<ShowEntriesListResponse> {
    const entries = await entryModel.all(params);

    return { success: true, entries: entriesMapper.many(entries) };
  }

  @Post()
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body(ValidationPipe) body: CreateEntryDto,
    @GetSession() session
  ): Promise<CreateEntryResponse> {
    const anime = await animeModel
      .findById(body.animeId)
      .then((anime) => animesMapper.one(anime));

    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    if (body.status === EntryStatus.Completed && anime.episode.count)
      body.progress = anime.episode.count;
    else if (body.progress === anime.episode.count) body.status = EntryStatus.Completed;

    if (
      !body.startedAt &&
      (body.status === EntryStatus.Completed || body.status === EntryStatus.Watching)
    ) {
      body.startedAt = new Date();
    }

    if (!body.finishAt && EntryStatus.Completed === body.status)
      body.finishAt = new Date();

    const entry = await entryModel.create(session.user.id, body);

    return { success: true, entry: entriesMapper.one(entry) };
  }
}

export default apiHandler(EntriesHandler);
