import {
  Get,
  Delete,
  Patch,
  Body,
  Query,
  HttpCode,
  ParseNumberPipe,
  NotFoundException,
} from 'next-api-decorators';
import { GetSession } from 'decorators/getSession';
import { entryModel, userFollowModel } from 'models';
import { entriesMapper } from 'mappers';
import { PrismaVisibility } from 'resources/prisma';
import { AuthGuard } from 'decorators/authGuard';
import { EntryStatus } from '@prisma/client';
import HttpStatus from 'resources/HttpStatus';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';

class EntryHandler extends ApiHandler {
  @Get()
  async show(@Query('id', ParseNumberPipe) id: number, @GetSession() session) {
    const entry = await entryModel.find(id).then((entry) => entriesMapper.one(entry));

    if (!entry) throw new NotFoundException('entry not found');
    if (entry.visibility !== PrismaVisibility.public) {
      if (!session) throw new NotFoundException('entry not found');

      if (entry.visibility === PrismaVisibility.limited) {
        const isFriends = await userFollowModel.isFriends(session.user.id, id);

        if (!isFriends) throw new NotFoundException('Entry not found');
      } else if (entry.userId !== session.id)
        throw new NotFoundException('Entry not found');
    }

    return { entry };
  }

  @Patch()
  @AuthGuard()
  async update(
    @Query('id', ParseNumberPipe) id: number,
    @Body() body: any,
    @GetSession() session
  ) {
    const entry = await entryModel
      .findWithAnime(id)
      .then((entry) => entriesMapper.one(entry));

    if (!entry && entry.userId === session.user.id)
      throw new NotFoundException('entry not found');

    if (body.status === EntryStatus.Completed && entry.anime.episode.count)
      body.progress = body.episode_count;
    else if (body.progress === entry.anime.episode.count)
      body.status = EntryStatus.Completed;

    if (!body.startedAt)
      if (entry.startedAt) body.startedAt = entry.startedAt;
      else if ([EntryStatus.Completed, EntryStatus.Watching].includes(body.status))
        body.startedAt = new Date();

    if (!body.finishAt)
      if (entry.finishAt) body.finishAt = entry.finishAt;
      else if (EntryStatus.Completed === body.status) body.finishAt = new Date();

    const newEntry = await entryModel.update(id, body);

    return { entry: entriesMapper.one(newEntry) };
  }

  @Delete()
  @AuthGuard()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Query('id', ParseNumberPipe) id: number, @GetSession() session) {
    try {
      await entryModel.delete(id);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code == 'P2025')
        throw new NotFoundException('entry not found');

      throw err;
    }
  }
}
export default apiHandler(EntryHandler);
