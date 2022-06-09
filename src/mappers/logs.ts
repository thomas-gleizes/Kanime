import { PrismaLog, PrismaLogs } from 'prisma/app';
import JsonParser from 'utils/jsonParser';
import { UsersMapper } from 'mappers';

class LogsMapper implements Mapper<PrismaLog, Log> {
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

    if (resource.user) {
      const [user] = UsersMapper.one(resource.user);
      log.user = user;
    }

    return log;
  }

  many(resources: PrismaLogs): Logs {
    return resources.map(this.one);
  }
}

export default new LogsMapper();
