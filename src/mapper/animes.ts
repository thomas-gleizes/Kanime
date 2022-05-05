import { PrismaAnime, PrismaAnimes } from 'prisma/app';
import { formatDateTime } from 'utils/date';
import jsonParser from 'utils/jsonParser';
import { CategoriesMapper, EntriesMapper, ReactionsMapper, SagasMapper } from './index';

class AnimesMapper implements Mapper<PrismaAnime, Anime> {
  public one(resource: PrismaAnime): Anime {
    if (!resource) return null;

    const anime: Anime = {
      id: resource.id,
      kitsu_id: resource.kitsu_id,
      slug: resource.slug,
      canonicalTitle: resource.canonical_title,
      titles: jsonParser<Titles>(resource.titles),
      season: resource.season,
      season_year: resource.season_year,
      status: resource.status,
      sagaId: resource.saga_id,
      type: resource.type,
      rating: {
        average: resource.rating_average,
        rank: resource.rating_rank,
      },
      popularity: {
        count: resource.popularity_count,
        rank: resource.popularity_rank,
      },
      episode: {
        length: resource.episode_length,
        count: resource.episode_count,
      },
      date_begin: formatDateTime(resource.date_begin),
      date_end: formatDateTime(resource.date_end),
      cover: jsonParser<Images>(resource.cover),
      poster: jsonParser<Images>(resource.poster),
      synopsis: resource.synopsis,
      description: resource.description,
    };

    if (resource.saga) anime.saga = SagasMapper.one(resource.saga);
    if (resource.entries) anime.entries = EntriesMapper.many(resource.entries);
    if (resource.reactions) anime.reactions = ReactionsMapper.many(resource.reactions);
    if (resource.categories)
      anime.categories = CategoriesMapper.many(resource.categories);

    return anime;
  }

  public many(resources: PrismaAnimes): Animes {
    return resources.map(this.one);
  }
}

export default new AnimesMapper();
