import { PrismaEntry } from 'app/prisma'
import Mapper from 'class/Mapper'
import { animesMapper, usersMapper } from 'mappers'

class EntriesMapper extends Mapper<PrismaEntry, Entry> {
  one(resource: PrismaEntry): Entry {
    const entry: Entry = {
      id: resource.id,
      animeId: resource.animeId,
      userId: resource.userId,
      status: resource.status,
      rating: resource.rating,
      progress: resource.progress,
      startedAt: resource.startedAt && resource.startedAt.toISOString(),
      finishAt: resource.finishAt && resource.finishAt.toISOString(),
      note: resource.note,
      visibility: resource.visibility,
      createAt: resource.createdAt.toISOString(),
      updateAt: resource.updatedAt.toISOString()
    }

    if (resource.anime) entry.anime = animesMapper.one(resource.anime)
    if (resource.user) entry.user = usersMapper.one(resource.user)

    return entry
  }
}

export default new EntriesMapper()
