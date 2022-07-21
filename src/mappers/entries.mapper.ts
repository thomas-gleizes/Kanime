import { PrismaEntries, PrismaEntry } from 'prisma/app';
import { AnimesMapper, UsersMapper } from 'mappers';

class EntriesMapper implements Mapper<PrismaEntry, Entry> {
  one(resource: PrismaEntry): Entry {
    const entry: Entry = {
      animeId: resource.anime_id,
      userId: resource.user_id,
      status: resource.status,
      rating: resource.rating,
      progress: resource.progress,
      startedAt: resource.started_at && resource.started_at.toISOString(),
      finishAt: resource.finish_at && resource.finish_at.toISOString(),
      note: resource.note,
      visibility: resource.visibility,
      createAt: resource.created_at.toISOString(),
      updateAt: resource.updated_at.toISOString(),
    };

    if (resource.anime) entry.anime = AnimesMapper.one(resource.anime);
    if (resource.user) entry.user = UsersMapper.one(resource.user);

    return entry;
  }

  many(resources: PrismaEntries): Entries {
    return resources.map(this.one);
  }
}

export default new EntriesMapper();
