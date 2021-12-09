import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { DefaultErrorData, DefaultResponseData } from "../../../../types";
import router from "../../../../lib/router";
import kitsuApi from "../../../../lib/kitsuApi";
import KitsuApi from "../../../../lib/kitsuApi";

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<any | DefaultErrorData>
) => {
  let categories: Array<any> = [];
  let count = 0;
  let next: string;

  const {
    data: { data, links, meta },
  } = await KitsuApi.get("categories");

  next = links.next;

  do {
    data.forEach(({ id, attributes }) => {
      count++;

      categories.push({
        id: id,
        name: attributes.title,
        attributes: attributes.slug,
        description: attributes,
      });
    });
  } while (count <= meta.count);

  res.send({ success: true, categories, links });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
