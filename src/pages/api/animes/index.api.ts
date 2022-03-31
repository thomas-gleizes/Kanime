import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import { withSessionApi } from 'services/session.service';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimesListResponse>) => {
  const { limit, skip } = req.query;
  const { user } = req.session;

  const animes: Array<Anime> = AnimesMapper.many(
    await AnimeModel.all({ limit, skip }, user?.id)
  );

  res.json({ success: true, animes, debug: { limit, skip } });
});

export default withSessionApi(handler);
