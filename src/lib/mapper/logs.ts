import { Log as LogModel } from '@prisma/client';
import { Mapper, Log, Logs } from '@types';
import Security from '@services/security';

class LogsMapper implements Mapper<LogModel, Log> {
  one(resource: LogModel): Log {
    const { created_at, auth_token, body, query, ...rest } = resource;

    return {
      ...rest,
      createAt: resource.created_at,
      body: body ? JSON.parse(body) : null,
      query: query ? JSON.parse(query) : null,
      authToken: auth_token ? Security.getTokenPayload(auth_token) : null,
    };
  }

  many(resources: Array<LogModel>): Logs {
    return resources.map(this.one);
  }
}

export default new LogsMapper();
