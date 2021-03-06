import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';
import { ApiError } from 'errors';
import HttpStatus from 'resources/HttpStatus';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeSlugResponse>) => {
  const { slug } = req.query;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);

  return res.json({ success: true, anime, params: req.query });
});

export default withSessionApi(handler);
