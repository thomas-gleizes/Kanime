import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'class/error';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeResponse>) => {
  const id = req.query.id as string;
  const ids = id.split(',');

  if (ids.length > 1) {
    const animes: Animes = AnimesMapper.many(
      await AnimeModel.findByIds(ids.map((id) => +id))
    );

    if (!animes) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

    return res.json({ success: true, animes });
  } else {
    const anime: Anime = AnimesMapper.one(await AnimeModel.findById(+id || 0));
    if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

    return res.json({ success: true, anime, params: req.query });
  }
});

export default withSessionApi(handler);
