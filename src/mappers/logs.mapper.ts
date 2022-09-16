import { PrismaLog } from 'prisma/app';
import Mapper from 'class/Mapper';
import { usersMapper } from 'mappers';
import JsonParser from 'utils/jsonParser';

class LogsMapper extends Mapper<PrismaLog, Log> {
  one(resource: PrismaLog): Log {
    const log: Log = {
      id: resource.id,
      path: resource.path,
      method: resource.method,
      ip: '0.0.0.0',
      body: JsonParser(resource.body),
      params: JsonParser(resource.params),
      createAt: resource.created_at.toISOString(),
    };

    if (resource.user) log.user = usersMapper.one(resource.user);

    return log;
  }
}

export default new LogsMapper();
