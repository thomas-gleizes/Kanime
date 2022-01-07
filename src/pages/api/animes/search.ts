import type { NextApiRequest, NextApiResponse } from 'next';

import { Animes, DefaultErrorData, DefaultResponseData } from '@types';
import router from '../../../lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {
  animes: Animes;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | DefaultErrorData>) => {
  const { limit, skip, query } = req.query;

  console.log('Query', query);

  if (!query) throw new ApiError(400, 'query required');

  const animes: Animes = AnimesMapper.many(
    await AnimeModel.search(query as string, { limit: +limit, skip: +skip })
  );

  res.send({ success: true, animes, length: animes.length, params: req.query });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
