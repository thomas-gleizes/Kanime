import {
  Get,
  Delete,
  Patch,
  Body,
  Query,
  HttpCode,
  ParseNumberPipe,
  ValidationPipe,
} from 'next-api-decorators';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { EntryStatus, Visibility } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { entryModel, userFollowModel } from 'models';
import { entriesMapper } from 'mappers';
import HttpStatus from 'resources/HttpStatus';
import { GetSession, AuthGuard } from 'decorators';
import { UpdateEntryDto } from 'dto';
import { NotFoundException } from 'exceptions/http';

class EntryHandler extends ApiHandler {
  @Get()
  async show(
    @Query('id', ParseNumberPipe) id: number,
    @GetSession() session
  ): Promise<ShowEntryResponse> {
    const entry = await entryModel.find(id).then((entry) => entriesMapper.one(entry));

    if (!entry) throw new NotFoundException('Entry not found');
    if (entry.visibility !== Visibility.public) {
      if (!session) throw new NotFoundException('Entry not found');

      if (entry.visibility === Visibility.limited) {
        const isFriends = await userFollowModel.isFriends(session.user.id, id);

        if (!isFriends) throw new NotFoundException('Entry not found');
      } else if (entry.userId !== session.id)
        throw new NotFoundException('Entry not found');
    }

    return { success: true, entry };
  }

  @Patch()
  @AuthGuard()
  async update(
    @Query('id', ParseNumberPipe) id: number,
    @Body(ValidationPipe) body: UpdateEntryDto,
    @GetSession() session
  ): Promise<UpdateEntryResponse> {
    const entry = await entryModel
      .findWithAnime(id)
      .then((entry) => entriesMapper.one(entry));

    if (!entry && entry.userId === session.user.id)
      throw new NotFoundException('entry not found');

    if (body.status === EntryStatus.Completed && entry.anime.episode.count)
      body.progress = entry.anime.episode.count;
    else if (body.progress === entry.anime.episode.count)
      body.status = EntryStatus.Completed;

    if (!body.startedAt)
      if (entry.startedAt) body.startedAt = entry.startedAt;
      else if (
        body.status === EntryStatus.Completed ||
        body.status === EntryStatus.Watching
      )
        body.startedAt = new Date();

    if (!body.finishAt)
      if (entry.finishAt) body.finishAt = entry.finishAt;
      else if (EntryStatus.Completed === body.status) body.finishAt = new Date();

    const newEntry = await entryModel.update(id, body);

    return { success: true, entry: entriesMapper.one(newEntry) };
  }

  @Delete()
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Query('id', ParseNumberPipe) id: number,
    @GetSession() session
  ): Promise<ApiResponse> {
    try {
      await entryModel.delete(id);

      return { success: true };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code == 'P2025')
        throw new NotFoundException('entry not found');

      throw err;
    }
  }
}

export default apiHandler(EntryHandler);
