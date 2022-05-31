import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { AnimeModel, EntryModel } from 'models';
import { EntriesMapper } from 'mappers';
import { ApiError } from 'class/error';
import { errorMessage } from 'resources/constants';
import { EntryStatus } from '@prisma/client';

interface ResponseData extends DefaultResponseData {
  entry: Entry;
}

const handler = apiHandler();

const createOrUpdate = async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const data = {
    userId: +userId,
    animeId: +animeId,
    ...req.body,
  };

  if (data.status === EntryStatus.Completed && anime.episode_count)
    data.progress = anime.episode_count;

  const entry = EntriesMapper.one(await EntryModel.upsert(data));

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
