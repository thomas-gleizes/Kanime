import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '../../../types';
import connexion from '../../../lib/connexion';
import animesResources from '../../../lib/resources/AnimesResources';
import router from '../../../lib/router';

interface Data extends DefaultResponseData {
  animes: Array<Anime>;
  length: number;
}

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { limit, skip } = req.query;

  const animes: Array<Anime> = animesResources.many(
    await connexion.anime.findMany({
      take: +limit || 10,
      skip: +skip || 0,
    })
  );

  res.send({ success: true, animes, length: animes.length, params: req.query });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
