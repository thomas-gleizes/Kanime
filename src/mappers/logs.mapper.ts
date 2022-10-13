import { PrismaLog } from 'app/prisma';
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
      body: resource.body ? JsonParser(resource.body) : null,
      params: resource.params ? JsonParser(resource.params) : null,
      createAt: resource.createdAt.toISOString(),
    };

    if (resource.user) log.user = usersMapper.one(resource.user);

    return log;
  }
}

export default new LogsMapper();
