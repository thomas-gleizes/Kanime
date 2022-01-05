import { Log as LogModel } from '@prisma/client';
import { Mapper, Log, Logs } from '@types';

class LogsMapper implements Mapper<LogModel, Log> {
  one(resource: LogModel): Log {
    const { created_at, auth_token, body, query, ...rest } = resource;

    return {
      ...rest,
      createAt: resource.created_at,
      body: JSON.parse(body),
      query: JSON.parse(query),
      authToken: JSON.parse(auth_token),
    };
  }

  many(resources: Array<LogModel>): Logs {
    return resources.map(this.one);
  }
}

export default new LogsMapper();
