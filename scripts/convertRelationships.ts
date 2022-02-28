import { PrismaClient } from '@prisma/client';

async function run() {
  const prisma = new PrismaClient();

  const imports = await prisma.sagaImport.findMany({
    where: { treat: false },
  });

  for (const imp of imports) {
    const details = JSON.parse(imp.details);
    const anime = await prisma.anime.findUnique({ where: { id: imp.import_id } });
    const ids: number[] = details.map((d) => +d.kitsu_id);

    console.log(anime.kitsu_id, anime.slug);

    const animes = await prisma.anime.findMany({
      where: { kitsu_id: { in: ids } },
    });

    const sagaAlreadyExist = animes.some((anime) => anime.saga_id);

    console.log('SagaAlreadyExist', sagaAlreadyExist);

    if (sagaAlreadyExist) {
      const sagaId = animes.find((a) => a.saga_id)?.saga_id;
      if (sagaId) {
        for (const anime of animes) {
          await prisma.anime.update({
            where: { id: anime.id },
            data: { saga_id: sagaId },
          });
        }
      }
    } else {
      const saga = await prisma.saga.create({
        data: {
          slug: anime.slug,
          canonical_title: anime.canonical_title,
          titles: anime.titles,
          description: anime.description,
        },
      });

      await prisma.anime.update({
        where: { id: anime.id },
        data: { saga_id: saga.id },
      });

      for (const anime of animes) {
        await prisma.anime.update({
          where: { id: anime.id },
          data: { saga_id: saga.id },
        });
      }
    }
  }
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0));

export {};
