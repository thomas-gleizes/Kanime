import { EntryStatus } from '@prisma/client';

import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { AnimeModel, EntryModel } from 'models';
import { EntriesMapper } from 'mappers';
import { ApiError } from 'errors';
import { errorMessage } from 'resources/constants';

interface ResponseData extends DefaultResponseData {
  entry: Entry;
}

const handler = apiHandler();

const createOrUpdate = async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { body, query, session } = req;
  const { id: animeId } = query;
  const { user } = session;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const currentEntry = EntryModel.get(user.id, +animeId);

  if (body.status === EntryStatus.Completed) {
    if (anime.episode_count) body.progress = anime.episode_count;
    if (currentEntry) {
    }
  }

  const entry = EntriesMapper.one(await EntryModel.upsert({ ...body }));

  res.json({ success: true, entry });
};

handler.post(verifyUser, createOrUpdate);
handler.patch(verifyUser, createOrUpdate);

handler.get(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id: animeId } = req.query;

  const entry = EntriesMapper.one(
    await EntryModel.unique(+req.session.user.id, +animeId)
  );

  res.json({ success: true, entry });
});

handler.delete(verifyUser, async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const entry = EntriesMapper.one(await EntryModel.delete(userId, +animeId));

  res.status(204).json({ success: true, entry });
});

export default withSessionApi(handler);
