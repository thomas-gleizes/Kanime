import { PrismaClient } from '@prisma/client';

async function run() {
  const prisma = new PrismaClient();

  const imports = await prisma.sagaImport.findMany({
    where: { treat: false },
  });

  for (const imp of imports) {
    const details = JSON.parse(imp.details);
    const anime = await prisma.anime.findUnique({ where: { id: imp.importId } });
    const ids: number[] = details.map((d) => +d.kitsu_id);

    const animes = await prisma.anime.findMany({
      where: { kitsuId: { in: ids } },
    });

    const sagaAlreadyExist = animes.some((anime) => anime.sagaId);

    console.log(anime.kitsuId, anime.slug, sagaAlreadyExist);

    if (sagaAlreadyExist) {
      const sagaId = animes.find((a) => a.sagaId)?.sagaId;
      if (sagaId) {
        for (const anime of animes) {
          await prisma.anime.update({
            where: { id: anime.id },
            data: { sagaId: sagaId },
          });
        }
      }
    } else {
      const saga = await prisma.saga.create({
        data: {
          slug: anime.slug,
          canonicalTitle: anime.canonicalTitle,
          titles: anime.titles,
          description: anime.description,
        },
      });

      await prisma.anime.update({
        where: { id: anime.id },
        data: { sagaId: saga.id },
      });

      for (const anime of animes) {
        await prisma.anime.update({
          where: { id: anime.id },
          data: { sagaId: saga.id },
        });
      }
    }

    await prisma.sagaImport.update({
      where: { id: imp.id },
      data: { treat: true },
    });
  }
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0));

export {};
