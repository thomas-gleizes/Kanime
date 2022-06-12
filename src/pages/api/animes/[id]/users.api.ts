import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'errors';
import { AnimeModel, UserModel } from 'models';
import { UsersMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeUserResponse>) => {
  const { id } = req.query;

  const anime = await AnimeModel.findById(+id);
  if (!anime) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.ANIME_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findByAnime(+id)).map(([user]) => user);

  res.json({ success: true, users, params: req.query });
});

export default withSessionApi(handler);
