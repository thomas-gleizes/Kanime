import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';
import { ApiError } from 'errors';
import HttpStatus from 'resources/HttpStatus';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimesSearchResponse>) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(HttpStatus.BAD_REQUEST, 'query is required');

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
