import { PrismaLog, PrismaUser } from 'prisma/app';
import MomentFr from 'utils/momentFr';
import JsonParser from 'utils/jsonParser';
import UsersMapper from './users';

interface PLog extends PrismaLog {
  user?: PrismaUser;
}

class LogsMapper implements Mapper<PLog, Log> {
  one(resource: PLog): Log {
    const [user] = UsersMapper.one(resource.user);

    return {
      id: resource.id,
      route: resource.route as Method,
      method: resource.method,
      ip: resource.ip,
      body: JsonParser(resource.body),
      query: JsonParser(resource.query),
      user: user,
      createAt: MomentFr(resource.created_at).format('YYYY/MM/DD HH:mm:ss'),
    };
  }

  many(resources: PLog[]): Logs {
    return resources.map(this.one);
  }
}

export default new LogsMapper();
