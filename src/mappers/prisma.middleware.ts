import { PrismaAnime } from 'prisma/app';
import jsonParser from 'utils/jsonParser';
import { CategoriesMapper, EntriesMapper, PostsMapper, SagasMapper } from './index';

abstract class PrismaMiddleware<Model, Output> {
  protected abstract parse(resource: Model): OptionalPromise<Output>;

  public async onResult(result: Model | Model[]) {
    if (Array.isArray(result)) {
      const values = [];
      for (const item of result) values.push(await this.parse(item));
      return values;
    } else {
      return this.parse(result);
    }
  }
}

class AnimeMiddleware extends PrismaMiddleware<PrismaAnime, Anime> {
  public parse(resource) {
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
      dateBegin: resource.date_begin && resource.date_begin.toISOString(),
      dateEnd: resource.date_end && resource.date_end.toISOString(),
      cover: jsonParser<Images>(resource.cover),
      poster: jsonParser<Images>(resource.poster),
      synopsis: resource.synopsis,
      description: resource.description,
    };

    if (resource.saga) anime.saga = SagasMapper.one(resource.saga);
    if (resource.entries) anime.entries = EntriesMapper.many(resource.entries);
    if (resource.posts) anime.posts = PostsMapper.many(resource.posts);
    if (resource.categories)
      anime.categories = CategoriesMapper.many(resource.categories);

    return anime;
  }
}

export { AnimeMiddleware, PrismaMiddleware };
