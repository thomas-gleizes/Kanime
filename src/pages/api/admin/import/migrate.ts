import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  res.send({ success: true });
}

async function migrate(id) {
  const prisma = new PrismaClient();
}
