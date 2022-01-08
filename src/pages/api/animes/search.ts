import type { NextApiRequest, NextApiResponse } from 'next';

import { Animes, DefaultErrorData, DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { ApiError } from '@errors';
import connexion from '@services/connexion';

interface Data extends DefaultResponseData {
  animes: any;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | DefaultErrorData>) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(400, 'query required');

  const animes = AnimesMapper.many(
    await AnimeModel.search(`${query}`, { limit: +limit, skip: +skip })
  );

  res.send({ success: true, animes, length: animes.length, params: { query } });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
