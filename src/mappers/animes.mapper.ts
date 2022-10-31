import { PrismaAnime } from 'app/prisma'
import Mapper from 'class/Mapper'
import jsonParser from 'utils/jsonParser'
import { categoriesMapper, entriesMapper, postsMapper, sagasMapper } from 'mappers'

class AnimesMapper extends Mapper<PrismaAnime, Anime> {
  public one(resource: PrismaAnime): Anime {
    const anime: Anime = {
      id: resource.id,
      kitsuId: resource.kitsuId,
      slug: resource.slug,
      canonicalTitle: resource.canonicalTitle,
      titles: resource.titles ? jsonParser<Titles>(resource.titles) : null,
      season: resource.season,
      season_year: resource.seasonYear,
      status: resource.status,
      sagaId: resource.sagaId,
      type: resource.type,
      rating: {
        average: resource.ratingAverage,
        rank: resource.ratingRank
      },
      popularity: {
        count: resource.popularityCount,
        rank: resource.popularityRank
      },
      episode: {
        length: resource.episodeLength,
        count: resource.episodeCount
      },
      dateBegin: resource.dateBegin && resource.dateBegin.toISOString(),
      dateEnd: resource.dateEnd && resource.dateEnd.toISOString(),
      cover: resource.cover ? jsonParser<Images>(resource.cover) : null,
      poster: resource.poster ? jsonParser<Images>(resource.poster) : null,
      synopsis: resource.synopsis,
      description: resource.description
    }

    if (resource.saga) anime.saga = sagasMapper.one(resource.saga)
    if (resource.entries) anime.entries = entriesMapper.many(resource.entries)
    if (resource.posts) anime.posts = postsMapper.many(resource.posts)
    if (resource.categories) anime.categories = categoriesMapper.many(resource.categories)

    return anime
  }
}

export default new AnimesMapper()
