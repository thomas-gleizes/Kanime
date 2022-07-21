import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, UserModel } from 'models';
import { AnimesMapper } from 'mappers';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'errors';
import HttpStatus from 'resources/HttpStatus';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ animes: Animes }>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(HttpStatus.NOT_FOUND, errorMessage.USER_NOT_FOUND);

  const animes = AnimesMapper.many(await AnimeModel.findByUser(+id));

  return res.json({ success: true, animes: animes });
});

export default withSessionApi(handler);
