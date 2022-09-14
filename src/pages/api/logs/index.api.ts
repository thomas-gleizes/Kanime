import { ApiRequest, ApiResponse } from 'next/app';
import { LogsMapper } from 'mappers';
import { LogModel } from 'models';
import { authAdminMiddleware } from 'middlewares/auth.middleware';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

const handler = apiHandler();

handler.get(
  authAdminMiddleware,
  async (req: ApiRequest, res: ApiResponse<{ logs: Logs }>) => {
    const { start, limit } = req.query;

    const logs = await LogModel.show({ limit: +limit || 20, skip: +start });

    return res.json({ success: true, logs: LogsMapper.many(logs) });
  }
);

export default withSessionApi(handler);
