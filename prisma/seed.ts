import { PrismaClient } from '@prisma/client';
import faker from 'faker';

import { defaultUsersMedia } from '../lib/constants';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({ where: {} });

  const user = await prisma.user.create({
    data: {
      id: 1,
      email: 'kalat@kanime.fr',
      password: '$2b$10$yMxJHwf3oW4e2UIYRHt8h.KggVZQiXmPNm4RYqinf2RPNGRgtSoB.',
      login: 'Kalat',
      is_admin: true,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
      city: 'Montpellier',
      country_id: 73,
      gender: 'Male'
    }
  });

  for (let i = 0; i < 40; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        login: faker.internet.userName(),
        password: '$2b$10$yMxJHwf3oW4e2UIYRHt8h.KggVZQiXmPNm4RYqinf2RPNGRgtSoB.',
        avatar_path: defaultUsersMedia.avatar,
        background_path: defaultUsersMedia.background,
        bio: faker.lorem.sentence(),
        birthday: faker.date.past(),
        gender: 'Male',
        city: faker.address.city(),
      }
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });