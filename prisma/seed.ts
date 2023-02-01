import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

import { DEFAULT_USER_MEDIA } from '../src/resources/constants'
import Security from '../src/services/security.service'

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.deleteMany({ where: {} })

  const password = 'azerty'

  // await prisma.user.create({
  //   data: {
  //     id: 1,
  //     username: 'Kalat',
  //     slug: 'kalat',
  //     email: 'kalat@kanime.fr',
  //     realEmail: 'kalat@kanime.fr',
  //     emailVerified: true,
  //     password: Security.sha512(password + 'Kalat'),
  //     isAdmin: true,
  //     avatarPath: DEFAULT_USER_MEDIA.avatar,
  //     backgroundPath: DEFAULT_USER_MEDIA.background,
  //     city: 'Montpellier',
  //     gender: 'Male',
  //   },
  // });

  for (let i = 0; i < 100; i++) {
    await prisma.user.createMany({
      data: Array.from({ length: 40 }, (_, n) => {
        const value = n * i

        const username: string = `User ${value}`
        const email: string = `user.${value}@kanime.dev`

        return {
          username: username,
          email: email,
          slug: username.toLowerCase().replaceAll(' ', '-'),
          realEmail: email,
          emailVerified: Math.random() > 0.4,
          password: Security.sha512(password + username),
          avatarPath: DEFAULT_USER_MEDIA.avatar,
          backgroundPath: DEFAULT_USER_MEDIA.background,
          bio: faker.lorem.sentence(),
          birthday: faker.date.past(),
          gender: Math.random() > 0.5 ? 'Male' : 'Female',
          city: faker.address.city()
        }
      }),
      skipDuplicates: true
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(prisma.$disconnect)
