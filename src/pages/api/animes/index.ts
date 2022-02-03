import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, ResAnimes, ResDefaultError } from '@types';
import router from '../../../lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { withSessionApi } from '@services/session';

router.get(
  async (req: NextApiRequest, res: NextApiResponse<ResAnimes | ResDefaultError>) => {
    const { limit, skip } = req.query;
    const { user } = req.session;

    const animes: Array<Anime> = AnimesMapper.many(
      await AnimeModel.all({ limit, skip }, user?.id)
    );

    res.send({ success: true, animes, count: animes.length, debug: { limit, skip } });
  }
);

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) =>
  router.handler(req, res)
);
