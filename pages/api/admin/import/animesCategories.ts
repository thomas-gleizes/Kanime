import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Category } from "@prisma/client";

import { DefaultErrorData } from "../../../../types";
import router from "../../../../lib/router";
import kitsuApi from "../../../../lib/kitsuApi";

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<any | DefaultErrorData>
) => {
  const categories: Category[] = await prisma.category.findMany({});
  const array: { category_id; anime_id }[] = [];

  for (const category of categories) {
    let limit: number;
    let count: number = 0;

    do {
      const {
        data: { data: animes, meta },
      } = await kitsuApi.get(
        `categories/${category.id}/anime?page[limit]=10&offset=${count}`
      );
      limit = meta.count;

      for (const anime of animes) {
      }
    } while (count < limit);
  }

  res.send({ success: true, categories });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
