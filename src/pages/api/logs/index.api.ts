import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { LogsMapper } from 'mapper';
import { LogModel } from 'models';
import { verifyAdmin } from 'resources/middleware';
import { withSessionApi } from 'services/session.service';

interface Data extends DefaultResponseData {
  logs: Logs;
  query?: any;
}

handler.get(verifyAdmin, async (req: ApiRequest, res: ApiResponse<Data>) => {
  const { start, limit } = req.query;

  const logs: Logs = LogsMapper.many(
    await LogModel.show({ limit: +limit || 20, skip: +start })
  );

  res.send({ success: true, query: req.query, logs });
});

export default withSessionApi(handler);
