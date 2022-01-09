import { AnimeUser as AnimeUserModel } from '@prisma/client';

import { Mapper } from '@types';
import { AnimesUsers, AnimeUser } from '@types';
import { formatForMapper } from '@helpers/momentFr';

class AnimesUsersMapper implements Mapper {
  one(resource: AnimeUserModel): AnimeUser {
    if (!resource) return null;

    return {
      animeId: resource.anime_id,
      userId: resource.user_id,
      status: resource.status,
      createAt: formatForMapper(resource.created_at),
      updateAt: formatForMapper(resource.updated_at),
    };
  }

  many(resources: Array<AnimeUserModel>): AnimesUsers {
    return resources.map(this.one);
  }
}

export default new AnimesUsersMapper();
