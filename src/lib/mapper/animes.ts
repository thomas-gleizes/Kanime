import { Anime as AnimeModel } from '@prisma/client';
import Moment from 'moment';

import { Anime, Mapper } from '@types';
import JsonParser from '@helpers/jsonParser';

class AnimesMapper implements Mapper<AnimeModel, Anime> {
  public one(resource: AnimeModel): Anime {
    if (!resource) return null;

    const {
      canonical_title,
      titles,
      cover,
      poster,
      rating_rank,
      rating_average,
      popularity_count,
      popularity_rank,
      episode_count,
      episode_length,
      created_at,
      date_begin,
      date_end,
      ...rest
    } = resource;

    return {
      canonicalTitle: canonical_title,
      titles: JsonParser(titles),
      cover: JsonParser(cover),
      poster: JsonParser(poster),
      rating: {
        average: rating_average,
        rank: rating_rank,
      },
      popularity: {
        count: popularity_count,
        rank: popularity_rank,
      },
      episode: {
        length: episode_length,
        count: episode_count,
      },
      date_begin: Moment(date_begin).format('YYYY-MM-DD HH:mm:ss'),
      date_end: Moment(date_begin).format('YYYY-MM-DD HH:mm:ss'),
      ...rest,
    };
  }

  public many(resources: Array<AnimeModel>): Array<Anime> {
    return resources.map(this.one);
  }
}

export default new AnimesMapper();
