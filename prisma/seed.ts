import { PrismaClient } from '@prisma/client';
import faker from '@faker-js/faker';

import { defaultUsersMedia } from '../src/resources/constants';
import Security from '../src/services/security.service';
import { removeDot } from '../src/utils/emailHelpers';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({ where: {} });

  const password = 'azerty';

  await prisma.user.create({
    data: {
      id: 1,
      username: 'kalat',
      email: 'kalat@kanime.fr',
      real_email: 'Kalat@kanime.fr',
      email_verified: true,
      password: Security.sha512(password + 'kalat'),
      is_admin: true,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
      city: 'Montpellier',
      gender: 'Male',
    },
  });

  for (let i = 0; i < 30000; i++) {
    const username: string = `user_${i}`;
    const email: string = `${username}@kanime.dev`;

    await prisma.user.create({
      data: {
        username: username,
        email: email,
        real_email: removeDot(email),
        email_verified: Math.random() > 0.4,
        password: Security.sha512(password + username),
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
