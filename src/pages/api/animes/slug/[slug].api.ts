import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { errorMessage } from 'resources/constants';
import ApiError from 'class/error/ApiError';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeSlugResponse>) => {
  const { slug } = req.query;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  res.json({ success: true, anime, params: req.query });
});

export default withSessionApi(handler);
