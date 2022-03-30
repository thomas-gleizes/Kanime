import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler as handler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, UserModel } from 'models';
import { UsersMapper } from 'mapper';
import { errorMessage } from 'resources/constants';
import ApiError from 'class/error/ApiError';

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeUserResponse>) => {
  const { id } = req.query;

  const anime = await AnimeModel.findById(+id);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findByAnime(+id)).map(([user]) => user);

  res.json({ success: true, users, params: req.query });
});

export default withSessionApi(handler);
