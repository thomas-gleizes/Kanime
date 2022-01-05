import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';

interface Data extends DefaultResponseData {
  animes: Array<Anime>;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { limit, skip, query } = req.query;

  const animes: Array<Anime> = AnimesMapper.many(
    await AnimeModel.search(query as string, { limit: +limit, skip: +skip })
  );

  res.send({ success: true, animes, params: req.query });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
