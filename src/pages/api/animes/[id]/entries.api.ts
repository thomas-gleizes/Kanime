import { Get, Query, ParseNumberPipe, NotFoundException } from 'next-api-decorators';
import { Visibility } from '@prisma/client';

import { apiHandler } from 'services/handler.service';
import { animeModel, entryModel, userFollowModel } from 'models';
import { entriesMapper } from 'mappers';
import { errorMessage } from 'resources/constants';
import { PrismaEntryStatus } from 'resources/prisma';
import ApiHandler from 'class/ApiHandler';
import { GetSession } from 'decorators/getSession';
import { QueryEntryListDto } from 'dto';

class AnimesEntriesHandler extends ApiHandler {
  @Get()
  async showEntries(
    @Query('id', ParseNumberPipe) id: number,
    @Query() query: QueryEntryListDto,
    @GetSession() session
  ) {
    const isExist = await animeModel.isExist(id);

    if (!isExist) throw new NotFoundException(errorMessage.ANIME_NOT_FOUND);

    const visibility: Visibility[] = ['public'];
    if (session?.user)
      if (session.user.id === id) visibility.push('limited', 'private');
      else {
        const isFriends = await userFollowModel.isFriends(session.user.id, id);

        if (isFriends) visibility.push('limited');
      }

    let orderBy;

    if (query.orderBy)
      for (const [key, value] of Object.entries(query.orderBy))
        orderBy = { field: key, order: value };

    const entries = await entryModel.getByAnimes(
      id,
      visibility,
      query.status as PrismaEntryStatus,
      orderBy,
      { ...query }
    );

    return { entries: entriesMapper.many(entries) };
  }
}

// handler.get(authMiddleware, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
//   const entry = await EntryModel.get(req.session.user.id, +req.query.id);
//
//   if (!entry) throw new ApiError(HttpStatus.NOT_FOUND, 'Entry not found');
//
//   return res.send({ success: true, entry: EntriesMapper.one(entry) });
// });
//
// handler.delete(authMiddleware, async (req: ApiRequest, res: ApiResponse) => {
//   const { id: animeId } = req.query;
//   const { id: userId } = req.session.user;
//
//   const anime = await AnimeModel.findById(+animeId);
//   if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);
//
//   await EntryModel.delete(userId, +animeId);
//
//   return res.status(HttpStatus.NO_CONTENT).json({ success: true });
// });
//
// const createOrUpdate = async (
//   req: ApiRequest<upsertEntries>,
//   res: ApiResponse<ResponseData>
// ) => {
//   const { body, query, session } = req;
//   const { id: animeId } = query;
//   const { user } = session;
//
//   const anime = await AnimeModel.findById(+animeId);
//   if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);
//
//   try {
//     await editEntrySchema(anime.episode_count || Infinity).validate(body);
//   } catch (err) {
//     throw new SchemaError(err);
//   }
//
//   const payload: upsertEntries = { ...body, animeId: animeId, userId: user.id };
//
//   const currentEntry = await EntryModel.get(user.id, +animeId);
//
//   if (body.status === EntryStatus.Completed && anime.episode_count)
//     payload.progress = anime.episode_count;
//   else if (payload.progress === anime.episode_count)
//     payload.status = EntryStatus.Completed;
//
//   if (!payload.startedAt) {
//     if (currentEntry?.started_at) payload.startedAt = currentEntry.started_at;
//     else {
//       // @ts-ignore
//       if ([EntryStatus.Completed, EntryStatus.Watching].includes(payload.status))
//         payload.startedAt = new Date();
//     }
//   }
//
//   if (!payload.finishAt) {
//     if (currentEntry?.finish_at) payload.finishAt = currentEntry.finish_at;
//     else if (EntryStatus.Completed === payload.status) payload.finishAt = new Date();
//   }
//
//   const entry = await EntryModel.upsert({
//     ...payload,
//     animeId: anime.id,
//     userId: user.id,
//   });
//
//   return res
//     .status(HttpStatus.CREATED)
//     .json({ success: true, entry: EntriesMapper.one(entry) });
// };
//
// handler.post(authMiddleware, createOrUpdate);
// handler.patch(authMiddleware, createOrUpdate);

export default apiHandler(AnimesEntriesHandler);
