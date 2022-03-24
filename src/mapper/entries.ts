import { PrismaEntries, PrismaEntry } from 'prisma/app';
import { formatForMapper } from 'utils/momentFr';
import { AnimesMapper, UsersMapper } from './index';

class EntriesMapper implements Mapper<PrismaEntry, Entry> {
  one(resource: PrismaEntry): Entry {
    if (!resource) return null;

    const entry: Entry = {
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

    if (resource.anime) entry.anime = AnimesMapper.one(resource.anime);

    if (resource.user) {
      const [user] = UsersMapper.one(resource.user);
      entry.user = user;
    }

    return entry;
  }

  many(resources: PrismaEntries): Entries {
    return resources.map(this.one);
  }
}

export default new EntriesMapper();
