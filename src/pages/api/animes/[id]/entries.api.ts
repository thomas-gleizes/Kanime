import { EntryStatus } from '@prisma/client';

import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { authMiddleware } from 'middlewares/auth.middleware';
import { AnimeModel, EntryModel } from 'models';
import { EntriesMapper } from 'mappers';
import { ApiError, SchemaError } from 'errors';
import HttpStatus from 'resources/HttpStatus';
import { errorMessage } from 'resources/constants';
import { editEntrySchema } from 'resources/validations';

interface ResponseData {
  entry: Entry;
}

const handler = apiHandler();

handler.get(authMiddleware, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const entry = await EntryModel.get(req.session.user.id, +req.query.id);

  if (!entry) throw new ApiError(HttpStatus.NOT_FOUND, 'Entry not found');

  return res.send({ success: true, entry: EntriesMapper.one(entry) });
});

handler.delete(authMiddleware, async (req: ApiRequest, res: ApiResponse) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);

  await EntryModel.delete(userId, +animeId);

  return res.status(HttpStatus.NO_CONTENT).json({ success: true });
});

const createOrUpdate = async (
  req: ApiRequest<upsertEntries>,
  res: ApiResponse<ResponseData>
) => {
  const { body, query, session } = req;
  const { id: animeId } = query;
  const { user } = session;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);

  try {
    await editEntrySchema(anime.episode_count || Infinity).validate(body);
  } catch (err) {
    throw new SchemaError(err);
  }

  const payload: upsertEntries = { ...body, animeId: animeId, userId: user.id };

  const currentEntry = await EntryModel.get(user.id, +animeId);

  if (body.status === EntryStatus.Completed && anime.episode_count)
    payload.progress = anime.episode_count;
  else if (payload.progress === anime.episode_count)
    payload.status = EntryStatus.Completed;

  if (!payload.startedAt) {
    if (currentEntry?.started_at) payload.startedAt = currentEntry.started_at;
    else {
      // @ts-ignore
      if ([EntryStatus.Completed, EntryStatus.Watching].includes(payload.status))
        payload.startedAt = new Date();
    }
  }

  if (!payload.finishAt) {
    if (currentEntry?.finish_at) payload.finishAt = currentEntry.finish_at;
    else if (EntryStatus.Completed === payload.status) payload.finishAt = new Date();
  }

  const entry = await EntryModel.upsert({
    ...payload,
    animeId: anime.id,
    userId: user.id,
  });

  return res
    .status(HttpStatus.CREATED)
    .json({ success: true, entry: EntriesMapper.one(entry) });
};

handler.post(authMiddleware, createOrUpdate);
handler.patch(authMiddleware, createOrUpdate);

export default withSessionApi(handler);
