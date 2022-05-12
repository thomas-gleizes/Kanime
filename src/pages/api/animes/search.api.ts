import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';
import { ApiError } from 'class/error';

const handler = apiHandler();

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
