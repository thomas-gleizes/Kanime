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
      username: 'Kalat',
      slug: 'kalat',
      email: 'kalat@kanime.fr',
      real_email: 'kalat@kanime.fr',
      email_verified: true,
      password: Security.sha512(password + 'Kalat'),
      is_admin: true,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
      city: 'Montpellier',
      gender: 'Male'
    }
  });

  for (let i = 0; i < 100; i++) {
    await prisma.user.createMany({
      data: Array.from({ length: 40 }, (_, n) => {
        const value = n * i;

        const username: string = `User ${value}`;
        const email: string = `user.${value}@kanime.dev`;

        return {
          username: username,
          email: email,
          slug: username.toLowerCase().replaceAll(' ', '-'),
          real_email: removeDot(email),
          email_verified: Math.random() > 0.4,
          password: Security.sha512(password + username),
          avatar_path: defaultUsersMedia.avatar,
          background_path: defaultUsersMedia.background,
          bio: faker.lorem.sentence(),
          birthday: faker.date.past(),
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          city: faker.address.city()
        };
      }),
      skipDuplicates: true
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(prisma.$disconnect);
