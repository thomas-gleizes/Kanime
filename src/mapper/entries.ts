import { Entry as EntryModel } from '@prisma/client';

import { formatForMapper } from 'utils/momentFr';

class EntriesMapper implements Mapper {
  one(resource: EntryModel): Entry {
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

  many(resources: Array<EntryModel>): Entries {
    return resources.map(this.one);
  }
}

export default new EntriesMapper();
