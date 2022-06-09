import { ApiRequest, ApiResponse } from 'next/app';
import { LogsMapper } from 'mappers';
import { LogModel } from 'models';
import { verifyAdmin } from 'middlewares/auth.middleware';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

interface Data extends DefaultResponseData {
  logs: Logs;
  query?: any;
}

const handler = apiHandler();

handler.get(verifyAdmin, async (req: ApiRequest, res: ApiResponse<Data>) => {
  const { start, limit } = req.query;

  const logs = await LogModel.show({ limit: +limit || 20, skip: +start });

  res.json({ success: true, query: req.query, logs: LogsMapper.many(logs) });
});

export default withSessionApi(handler);
