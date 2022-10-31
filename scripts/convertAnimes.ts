import { PrismaClient, AnimeSeason, AnimeStatus, AnimeType } from '@prisma/client'

function getSeason(date: Date | null): AnimeSeason | null {
  if (!date) return null

  const month = date.getMonth()

  if (month < 3) return 'Winter'
  else if (month < 6) return 'Springs'
  else if (month < 9) return 'Summer'
  return 'Fall'
}

async function run() {
  const prisma = new PrismaClient()

  const animes = await prisma.animeImport.findMany({ where: { animeId: null } })

  for (const anime of animes) {
    console.log(anime.id, anime.slug)

    const year = getSeason(anime.dateBegin)

    await prisma.anime
      .create({
        data: {
          kitsuId: anime.kitsuId,
          slug: anime.slug,
          canonicalTitle: anime.canonicalTitle,
          titles: anime.titles,
          synopsis: anime.synopsis,
          description: anime.synopsis,
          season: getSeason(anime.dateBegin),
          seasonYear: anime.dateBegin ? `${anime.dateBegin.getFullYear()}` : null,
          dateBegin: anime.dateBegin,
          dateEnd: anime.dateEnd,
          ratingAverage: null,
          ratingRank: null,
          popularityCount: null,
          popularityRank: null,
          type: anime.type as AnimeType,
          poster: anime.poster,
          cover: anime.cover,
          episodeCount: anime.episodeCount,
          episodeLength: anime.episodeLength,
          status: anime.status as AnimeStatus
        }
      })
      .then(async (newAnime) => {
        await prisma.animeImport.update({
          where: { id: anime.id },
          data: {
            animeId: newAnime.id
          }
        })
      })
  }
}

run()
  .then(() => console.log('\x1b[32m', 'Script success', '\x1b[0m'))
  .catch((e) => console.log('Scripts crash :, \n', e))
  .finally(() => process.exit(0))

export {}
