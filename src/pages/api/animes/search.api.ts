import type { NextApiRequest, NextApiResponse } from 'next';

import { ResAnimesSearch, ResDefaultError } from '@types';
import handler from '@lib/routing';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { ApiError } from '@errors';
import { withSessionApi } from '@services/session';

handler.get(
  async (
    req: NextApiRequest,
    res: NextApiResponse<ResAnimesSearch | ResDefaultError>
  ) => {
    const { limit, skip, query } = req.query;

    if (!query) throw new ApiError(400, 'query is required');

    const animes = AnimesMapper.many(
      await AnimeModel.search(query as string, { limit, skip })
    );

    res.status(200).send({
      success: true,
      animes,
      count: animes.length,
      debug: { limit, skip, query },
    });
  }
);

export default withSessionApi(handler);
