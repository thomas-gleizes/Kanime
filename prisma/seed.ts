import { PrismaClient } from '@prisma/client';
import faker from 'faker';

import { defaultUsersMedia } from '../src/lib/constants';
import Security from '../src/lib/services/security';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({ where: {} });

  const hash = await Security.hash('azerty');

  await prisma.user.create({
    data: {
      id: 1,
      email: 'kalat@kanime.fr',
      password: hash,
      login: 'Kalat',
      is_admin: true,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
      city: 'Montpellier',
      country_id: 73,
      gender: 'Male',
    },
  });

  for (let i = 0; i < 40; i++) {
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        login: faker.internet.userName(),
        password: hash,
        avatar_path: defaultUsersMedia.avatar,
        background_path: defaultUsersMedia.background,
        bio: faker.lorem.sentence(),
        birthday: faker.date.past(),
        gender: 'Male',
        city: faker.address.city(),
      },
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
