import { AnimeUser as AnimeUserModel } from '@prisma/client';

import { AnimesUsers, AnimeUser, Mapper } from '@types';
import { formatForMapper } from '@helpers/momentFr';

class AnimesUsersMapper implements Mapper {
  one(resource: AnimeUserModel): AnimeUser {
    if (!resource) return null;

    return {
      animeId: resource.anime_id,
      userId: resource.user_id,
      status: resource.status,
      rating: resource.rating,
      progress: resource.progress,
      startedAt: formatForMapper(resource.started_at),
      finishAt: formatForMapper(resource.finish_at),
      note: resource.note,
      createAt: formatForMapper(resource.created_at),
      updateAt: formatForMapper(resource.updated_at),
    };
  }

  many(resources: Array<AnimeUserModel>): AnimesUsers {
    return resources.map(this.one);
  }
}

export default new AnimesUsersMapper();
