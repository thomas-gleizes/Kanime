import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface ResponseData extends DefaultResponseData {
  anime: Anime;
}

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findById(+id));

  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  res.send({ success: true, anime, params: req.query });
});

export default withSessionApi(handler);
