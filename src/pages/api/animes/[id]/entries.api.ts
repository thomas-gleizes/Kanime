import { EntryStatus } from '@prisma/client';

import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { AnimeModel, EntryModel } from 'models';
import { EntriesMapper } from 'mappers';
import { ApiError, SchemaError } from 'errors';
import { errorMessage } from 'resources/constants';
import { editEntrySchema } from 'resources/validations';

interface ResponseData extends DefaultResponseData {
  entry: Entry;
}

const handler = apiHandler();

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const entry = EntriesMapper.one(
    await EntryModel.get(req.session.user.id, +req.query.id)
  );

  if (!entry) throw new ApiError(404, 'Entry not found');

  res.send({ success: true, entry });
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const entry = EntriesMapper.one(await EntryModel.delete(userId, +animeId));

  res.status(204).json({ success: true, entry });
});

const createOrUpdate = async (
  req: ApiRequest<upsertEntries>,
  res: ApiResponse<ResponseData>
) => {
  const { body, query, session } = req;
  const { id: animeId } = query;
  const { user } = session;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

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

  const entry = EntriesMapper.one(
    await EntryModel.upsert({ ...payload, animeId: anime.id, userId: user.id })
  );

  res.json({ success: true, entry });
};

handler.post(verifyUser, createOrUpdate);
handler.patch(verifyUser, createOrUpdate);

export default withSessionApi(handler);
