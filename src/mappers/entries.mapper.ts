import { PrismaEntry } from 'prisma/app';
import Mapper from 'class/Mapper';
import { animesMapper, usersMapper } from 'mappers';

class EntriesMapper extends Mapper<PrismaEntry, Entry> {
  one(resource: PrismaEntry): Entry {
    const entry: Entry = {
      id: resource.id,
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

    if (resource.anime) entry.anime = animesMapper.one(resource.anime);
    if (resource.user) entry.user = usersMapper.one(resource.user);

    return entry;
  }
}

export default new EntriesMapper();
