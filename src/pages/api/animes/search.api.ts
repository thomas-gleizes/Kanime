import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler as handler } from 'services/handler.service';
import ApiError from 'class/error/ApiError';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { withSessionApi } from 'services/session.service';

handler.get(async (req: ApiRequest, res: ApiResponse<AnimesSearchResponse>) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const animes = AnimesMapper.many(
    await AnimeModel.search(query as string, { limit, skip })
  );

  res.json({
    success: true,
    animes,
    debug: { limit, skip, query },
  });
});

export default withSessionApi(handler);
