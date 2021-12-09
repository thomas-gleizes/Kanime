import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

import { DefaultErrorData, DefaultResponseData } from "../../../../types";
import router from "../../../../lib/router";
import kitsuApi from "../../../../lib/kitsuApi";

const prisma = new PrismaClient();

router.get = async (
  req: NextApiRequest,
  res: NextApiResponse<any | DefaultErrorData>
) => {
  const latestCategories = await prisma.category.count();

  const path: string = "categories?page%5Blimit%5D=10&page%5Boffset%5D=0";

  res.send({ success: true, count: latestCategories });
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
