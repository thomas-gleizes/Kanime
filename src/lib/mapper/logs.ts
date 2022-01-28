import * as Prisma from '@prisma/client';

import { Mapper, Log, Logs, Method } from '@types';
import MomentFr from '@helpers/momentFr';
import JsonParser from '@helpers/jsonParser';
import { UsersMapper } from '@lib/mapper/index';

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
