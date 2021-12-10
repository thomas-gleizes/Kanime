import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { Category, DefaultErrorData, DefaultResponseData } from '../../../../types';
import router from '../../../../lib/router';
import CategoriesResources from '../../../../resources/CategoriesResources';

interface Data extends DefaultResponseData {
  categories: Category[];
}

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { id } = req.query;

  const categories: any[] = CategoriesResources.many(
    await prisma.category.findMany({
      where: {
        animes: { some: { anime_id: +id } },
      },
    })
  );

  res.send({ success: true, categories, params: req.query });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
