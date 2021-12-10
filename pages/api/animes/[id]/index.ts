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
  const { id } = req.query;

  const anime: Anime = animesResources.one(
    await prisma.anime.findUnique({
      where: { id: +id },
    })
  );

  res.send({ success: true, anime, params: req.query });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
