import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimesListResponse>) => {
  const animes = await AnimeModel.all(req.query);

  return res.json({ success: true, animes: AnimesMapper.many(animes) });
});

export default withSessionApi(handler);
