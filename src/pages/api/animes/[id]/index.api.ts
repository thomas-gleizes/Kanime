import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { errorMessage } from 'resources/constants';
import ApiError from 'class/error/ApiError';
import logs from '../../../../mapper/logs';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeResponse>) => {
  const id = req.query.id as string;
  const ids = id.split(',');

  console.log('Ids', ids);

  if (ids.length > 1) {
    const animes: Animes = AnimesMapper.many(
      await AnimeModel.findByIds(ids.map((id) => +id))
    );
    console.log('Ani', animes);

    if (!animes) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

    return res.json({ success: true, animes });
  } else {
    const anime: Anime = AnimesMapper.one(await AnimeModel.findById(+id || 0));
    if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

    return res.json({ success: true, anime, params: req.query });
  }
});

export default withSessionApi(handler);
