import {
  Get,
  Post,
  Body,
  Query,
  HttpCode,
  ValidationPipe,
  NotFoundException,
} from 'next-api-decorators';
import { EntryStatus } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { errorMessage } from 'resources/constants';
import HttpStatus from 'resources/HttpStatus';
import { animeModel, entryModel } from 'models';
import { entriesMapper } from 'mappers';
import { AuthGuard, GetSession } from 'decorators';
import { QueryParamsDto } from 'dto';

class EntriesHandler extends ApiHandler {
  @Get()
  async showAll(@Query(ValidationPipe) params: QueryParamsDto) {
    const entries = await entryModel.all(params);

    return { entries: entriesMapper.many(entries) };
  }

  @Post()
  @AuthGuard()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any, @GetSession() session) {
    const anime = await animeModel.findById(body.animeId);
    if (!anime) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    const entryData: upsertEntries = { ...body, userId: session.user.id };

    if (entryData.status === EntryStatus.Completed && anime.episode_count)
      entryData.progress = anime.episode_count;
    else if (entryData.progress === anime.episode_count)
      entryData.status = EntryStatus.Completed;

    if (
      !entryData.startedAt &&
      // @ts-ignore
      [EntryStatus.Completed, EntryStatus.Watching].includes(entryData.status)
    ) {
      entryData.startedAt = new Date();
    }

    if (!entryData.finishAt && EntryStatus.Completed === entryData.status) {
      entryData.finishAt = new Date();
    }

    const entry = await entryModel.create(entryData);

    return { entry: entriesMapper.one(entry) };
  }
}

export default apiHandler(EntriesHandler);
