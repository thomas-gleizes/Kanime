import random from '../src/utils/random';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

async function run() {
  const prisma = new PrismaClient();

  const { importId: length } = await prisma.sagaImport.findFirst({
    orderBy: { id: 'desc' },
    take: 1,
  });
  const animes = await prisma.animeImport.findMany({ skip: length });

  for (const anime of animes) {
    const exist = await prisma.sagaImport.findFirst({ where: { importId: anime.id } });

    if (exist) {
      console.log('Skip', anime.id, anime.slug);
      continue;
    }

    const response = await axios.get(
      `https://kitsu.io/api/edge/anime/${anime.kitsuId}?include=mediaRelationships.destination`
    );

    if (response.data.included) {
      const data = [];
      for (const relation of response.data.included) {
        if (relation.type === 'anime') {
          data.push({ kitsu_id: relation.id, slug: relation.attributes.slug });
        }
      }

      if (data.length > 0) {
        console.log(
          anime.id,
          anime.slug +
            ' => ' +
            response.data.included
              .filter((include) => include.type === 'anime')
              .map((include) => include.attributes.slug)
              .join(' - ')
        );

        await prisma.sagaImport.create({
          data: {
            importId: anime.id,
            details: JSON.stringify(data),
            treat: false,
          },
        });

        const delay = random(10, 2000);

        console.log('Sleep', delay);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0));

export {};
