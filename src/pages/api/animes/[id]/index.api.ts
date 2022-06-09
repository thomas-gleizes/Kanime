import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'errors';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeResponse>) => {
  const id = req.query.id as string;

  const anime = await AnimeModel.findById(+id);

  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  return res.json({ success: true, anime: AnimesMapper.one(anime) });
});

export default withSessionApi(handler);
