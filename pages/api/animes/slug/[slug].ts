import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { Anime, DefaultErrorData, DefaultResponseData } from '../../../../types';
import animesResources from '../../../../resources/AnimesResources';
import router from '../../../../lib/router';

interface Data extends DefaultResponseData {
  anime: Anime;
}

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { slug } = req.query;

  try {
    const anime: Anime = animesResources.one(
      await prisma.anime.findUnique({
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
