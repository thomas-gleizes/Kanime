import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '../../../../types';
import connexion from '../../../../lib/connexion';
import animesResources from '../../../../lib/resources/AnimesResources';
import router from '../../../../lib/router';

interface Data extends DefaultResponseData {
  animes: Array<Anime>;
}

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { limit, skip, query } = req.query;

  const animes: Array<Anime> = animesResources.many(
    await connexion.anime.findMany({
      where: {
        canonical_title: {
          contains: `${query}`,
        },
      },
      take: +limit || 100,
      skip: +skip || 0,
    })
  );

  res.send({ success: true, animes, params: req.query });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
