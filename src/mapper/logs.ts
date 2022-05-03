import { PrismaLog, PrismaLogs } from 'prisma/app';
import MomentFr from 'utils/momentFr';
import JsonParser from 'utils/jsonParser';
import UsersMapper from './users';

class LogsMapper implements Mapper<PrismaLog, Log> {
  one(resource: PrismaLog): Log {
    const log: Log = {
      id: resource.id,
      path: resource.path,
      method: resource.method,
      ip: resource.ip,
      body: JsonParser(resource.body),
      params: JsonParser(resource.params),
      createAt: MomentFr(resource.created_at).format('YYYY/MM/DD HH:mm:ss'),
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
