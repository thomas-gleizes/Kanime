import type { NextApiRequest, NextApiResponse } from 'next';

import { Anime, DefaultErrorData, DefaultResponseData } from '../../../../types';
import connexion from '../../../../lib/connexion';
import animesResources from '../../../../lib/resources/AnimesResources';
import router from '../../../../lib/router';

interface Data extends DefaultResponseData {
  anime: Anime;
}

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { slug } = req.query;

  try {
    const anime: Anime = animesResources.one(
      await connexion.anime.findUnique({
        where: { slug: `${slug}` },
      })
    );

    res.send({ success: true, anime, params: req.query });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
