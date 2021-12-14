import type { NextApiRequest, NextApiResponse } from 'next';

import { Category, DefaultErrorData, DefaultResponseData } from '../../../../types';
import connexion from '../../../../lib/connexion';
import router from '../../../../lib/router';
import CategoriesResources from '../../../../lib/resources/CategoriesResources';

interface Data extends DefaultResponseData {
  categories: Category[];
}

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | DefaultErrorData>
) => {
  const { id } = req.query;

  const categories: any[] = CategoriesResources.many(
    await connexion.category.findMany({
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
