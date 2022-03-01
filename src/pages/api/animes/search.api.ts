import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import ApiError from 'class/error/ApiError';
import { AnimesMapper } from 'mapper';
import { AnimeModel } from 'models';
import { withSessionApi } from 'services/session.service';

interface Response extends DefaultResponse {
  animes: Animes;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const animes = AnimesMapper.many(
    await AnimeModel.search(query as string, { limit, skip })
  );

  res.status(200).send({
    success: true,
    animes,
    debug: { limit, skip, query },
  });
});

export default withSessionApi(handler);
