import type { NextApiRequest, NextApiResponse } from 'next';
import { Category } from '@prisma/client';

import { verifyAdmin, withSessionApi } from '@services/session';
import connexion from '@services/connexion';
import router from '@lib/routing/router';
import kitsuApi from '@lib/api/kitsuApi';

router.get(verifyAdmin, async (req: NextApiRequest, res: NextApiResponse) => {
  const categories: Category[] = await connexion.category.findMany({});
  const array: { category_id; anime_id }[] = [];

  // TODO : not finish

  for (const category of categories) {
    let limit: number;
    let count: number = 0;

    do {
      const {
        data: { data: animes, meta },
      } = await kitsuApi.get(
        `categories/${category.id}/anime?page[limit]=10&page[offset]=${count}`
      );
      limit = meta.count;

      for (const anime of animes) {
      }
    } while (count < limit);
  }

  res.send({ success: true, categories });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
