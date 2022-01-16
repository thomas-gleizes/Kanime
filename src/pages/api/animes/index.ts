import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '@types';
import router from '../../../lib/routing/router';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {
  animes: Array<Anime>;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data | DefaultErrorData>) => {
  const { limit, skip } = req.query;
  const { user } = req.session;

  const animes: Array<Anime> = AnimesMapper.many(
    await AnimeModel.all({ limit: +limit, skip: +skip }, user?.id)
  );

  res.send({ success: true, animes, length: animes.length, params: req.query });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) =>
  router.handler(req, res)
);
