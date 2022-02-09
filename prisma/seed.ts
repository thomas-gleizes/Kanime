import { PrismaClient } from '@prisma/client';
import faker from 'faker';

import { defaultUsersMedia } from '../src/lib/constants';
import Security from '../src/lib/services/security';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({ where: {} });

  const password = 'azerty';

  await prisma.user.create({
    data: {
      id: 1,
      username: 'kalat',
      email: 'kalat@kanime.fr',
      password: await Security.hash(password + 'kalat'),
      is_admin: true,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
      city: 'Montpellier',
      gender: 'Male',
    },
  });

  for (let i = 0; i < 20; i++) {
    const username: string = faker.internet.userName();

    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: username,
        password: await Security.hash('azerty' + username),
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
