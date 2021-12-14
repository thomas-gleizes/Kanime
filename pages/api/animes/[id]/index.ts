import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '@types';
import connexion from '@lib/connexion';
import animesResources from '@lib/resources/AnimesResources';
import router from '@lib/router';

interface Data extends DefaultResponseData {
  anime: Anime;
}

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { id } = req.query;

  const anime: Anime = animesResources.one(
    await connexion.anime.findUnique({
      where: { id: +id },
    })
  );

  res.send({ success: true, anime, params: req.query });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
