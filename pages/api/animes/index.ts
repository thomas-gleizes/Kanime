import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesResources } from '@resources';

interface Data extends DefaultResponseData {
  animes: Array<Anime>;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | DefaultErrorData>) => {
  const { limit, skip } = req.query;

  const animes: Array<Anime> = AnimesResources.many(
    await AnimeModel.getMany({ limit: +limit, skip: +skip })
  );

  res.send({ success: true, animes, length: animes.length, params: req.query });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
