import { PrismaClient } from '@prisma/client';
import axios from 'axios';

async function run() {
  const prisma = new PrismaClient();

  let n = await prisma.animeImport.count();

  let total = 0;

  do {
    const {
      data: { data: animes, meta },
    } = await axios.get(
      `https://kitsu.io/api/edge/anime?page[offset]=${n}&page[limit]=20`
    );

    total = meta.count;
    await new Promise((resolve) => setTimeout(resolve, 200));

    for (const anime of animes) {
      n += 1;
      console.log(anime.id, anime.attributes.slug);

      const finded = await prisma.animeImport.findFirst({
        where: { kitsu_id: +anime.id },
      });

      if (finded) {
        console.log('skip');
        continue;
      }

      try {
        const cover = {
          tiny: anime.attributes.coverImage?.tiny,
          small: anime.attributes.coverImage?.small,
          medium: anime.attributes.coverImage?.medium,
          large: anime.attributes.coverImage?.large,
          original: anime.attributes.coverImage?.original,
        };
        const poster = {
          tiny: anime.attributes.posterImage?.tiny,
          small: anime.attributes.posterImage?.small,
          medium: anime.attributes.posterImage?.medium,
          large: anime.attributes.posterImage?.large,
          original: anime.attributes.posterImage?.original,
        };

        await prisma.animeImport.create({
          data: {
            kitsu_id: +anime.id,
            slug: anime.attributes.slug,
            canonical_title: anime.attributes.canonicalTitle,
            titles: JSON.stringify(anime.attributes.titles),
            synopsis: anime.attributes.synopsis,
            description: anime.attributes.description,
            date_begin: new Date(anime.attributes.startDate),
            date_end: new Date(anime.attributes.endDate),
            rating_average: +anime.attributes.averageRating,
            rating_rank: +anime.attributes.ratingRank,
            popularity_count: +anime.attributes.userCount,
            popularity_rank: +anime.attributes.popularityRank,
            type: anime.attributes.showType,
            poster: JSON.stringify(poster),
            cover: JSON.stringify(cover),
            episode_count: anime.attributes.episodeCount,
            episode_length: anime.attributes.episodeLength,
            status: anime.attributes.status,
          },
        });
      } catch (e) {
        console.log('E', e);

        process.exit(1);
      }
    }
    console.log('N', n);
    console.log('Total', total);
  } while (n < total);
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0));

export {};
