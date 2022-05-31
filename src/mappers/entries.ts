import { PrismaEntries, PrismaEntry } from 'prisma/app';
import { formatDateTime } from 'utils/date';
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
      startedAt: formatDateTime(resource.started_at),
      finishAt: formatDateTime(resource.finish_at),
      note: resource.note,
      visibility: resource.visibility,
      createAt: formatDateTime(resource.created_at),
      updateAt: formatDateTime(resource.updated_at),
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
