import { PrismaEntry } from 'prisma/app';
import Mapper from 'class/Mapper';
import { AnimesMapper, UsersMapper } from 'mappers';

class EntriesMapper extends Mapper<PrismaEntry, Entry> {
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
}

export default new EntriesMapper();
