import { Anime as AnimeModel } from '@prisma/client';
import Moment from 'moment';

import { Anime, Mapper } from '@types';
import JsonParser from '@helpers/jsonParser';

class AnimesMapper implements Mapper<AnimeModel, Anime> {
  public one(resource: AnimeModel): Anime {
    if (!resource) return null;

    return {
      id: resource.id,
      kitsu_id: resource.kitsu_id,
      slug: resource.slug,
      canonicalTitle: resource.canonical_title,
      titles: JsonParser(resource.titles),
      season: resource.season,
      season_year: resource.season_year,
      status: resource.status,
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
      date_begin: Moment(resource.date_begin).format('YYYY-MM-DD HH:mm:ss'),
      date_end: Moment(resource.date_end).format('YYYY-MM-DD HH:mm:ss'),
      cover: JsonParser(resource.cover),
      poster: JsonParser(resource.poster),
      synopsis: resource.synopsis,
      description: resource.description,
    };
  }

  public many(resources: Array<AnimeModel>): Array<Anime> {
    return resources.map(this.one);
  }
}

export default new AnimesMapper();
