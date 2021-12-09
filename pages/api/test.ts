import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const test = await prisma.animeCategory.create({
    data: {
      category_id: 1,
      anime_id: 2,
    },
  });

  res.send({ success: true, test });
}
