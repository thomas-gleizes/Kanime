import * as Prisma from '@prisma/client';

import MomentFr from 'utils/momentFr';
import JsonParser from 'utils/jsonParser';
import UsersMapper from './users';

interface DbLog extends Prisma.Log {
  user?: Prisma.User;
}

class LogsMapper implements Mapper<DbLog, Log> {
  one(resource: DbLog): Log {
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

  many(resources: Array<DbLog>): Logs {
    return resources.map(this.one);
  }
}

export default new LogsMapper();
