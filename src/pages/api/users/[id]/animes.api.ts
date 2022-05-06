import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, UserModel } from 'models';
import { AnimesMapper } from 'mapper';
import { errorMessage } from 'resources/constants';
import { ApiError } from 'class/error';

interface ResponseData extends DefaultResponseData {
  animes: Animes;
  length: number;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const animes = AnimesMapper.many(await AnimeModel.findByUser(+id));

  res.json({ success: true, animes: animes, length: animes.length });
});

export default withSessionApi(handler);
