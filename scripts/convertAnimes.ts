import { PrismaClient, AnimeSeason, AnimeStatus, AnimeType } from '@prisma/client';

function getSeason(date: Date): AnimeSeason {
  const month = date.getMonth();

  if (month < 3) return 'Winter';
  else if (month < 6) return 'Springs';
  else if (month < 9) return 'Summer';
  return 'Fall';
}

async function run() {
  const prisma = new PrismaClient();

  const animes = await prisma.animeImport.findMany({ where: { anime_id: null } });

  for (const anime of animes) {
    console.log(anime.id, anime.slug);

    const newAnime = await prisma.anime.upsert({
      where: { kitsu_id: anime.kitsu_id },
      update: {},
      create: {
        kitsu_id: anime.kitsu_id,
        slug: anime.slug,
        canonical_title: anime.canonical_title,
        titles: anime.titles,
        synopsis: anime.synopsis,
        description: anime.synopsis,
        season: getSeason(new Date(anime.date_begin)),
        season_year: `${new Date(anime.date_begin).getFullYear()}`,
        date_begin: anime.date_begin,
        date_end: anime.date_end,
        rating_average: 0,
        rating_rank: 0,
        popularity_count: 0,
        popularity_rank: 0,
        type: anime.type as AnimeType,
        poster: anime.poster,
        cover: anime.cover,
        episode_count: anime.episode_count,
        episode_length: anime.episode_length,
        status: anime.status as AnimeStatus,
      },
    });

    await prisma.animeImport.update({
      where: { id: anime.id },
      data: {
        anime_id: newAnime.id,
      },
    });
  }
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0));

export {};
