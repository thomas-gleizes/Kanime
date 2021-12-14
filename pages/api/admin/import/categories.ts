import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

import { DefaultErrorData } from '../../../../types';
import connexion from '../../../../lib/connexion';
import router from '../../../../lib/router';
import KitsuApi from '../../../../lib/api/kitsuApi';

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<any | DefaultErrorData>
) => {
  let categories: Array<any> = [];
  let count: number = await prisma.category.count();
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
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}

const test = {};
