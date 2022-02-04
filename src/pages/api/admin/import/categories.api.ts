import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyAdmin, withSessionApi } from '@services/session';
import connexion from '@services/connexion';
import router from '@lib/routing/handler';
import KitsuApi from '@lib/axios/kitsuApi';

router.get(verifyAdmin, async (req: NextApiRequest, res: NextApiResponse) => {
  let categories: Array<any> = [];
  let count: number = await connexion.category.count();
  let limit: number = 0;

  do {
    const {
      data: { data, meta },
    } = await KitsuApi.get(`categories?page[limit]=10&page[offset]=${count}`);

    limit = meta.count;

    data.forEach(({ id, attributes }) => {
      console.log(count, id, attributes);

      count++;

      categories.push({
        name: attributes.title,
        slug: attributes.slug,
        description: attributes.description,
      });
    });
  } while (count < limit);

  await connexion.category.createMany({ data: categories });

  res.send({ success: true, categories });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
