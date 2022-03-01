import { PrismaEntries, PrismaEntry } from 'prisma/app';
import { formatForMapper } from 'utils/momentFr';

class EntriesMapper implements Mapper<PrismaEntry, Entry> {
  one(resource: PrismaEntry): Entry {
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

  many(resources: PrismaEntries): Entries {
    return resources.map(this.one);
  }
}

export default new EntriesMapper();
