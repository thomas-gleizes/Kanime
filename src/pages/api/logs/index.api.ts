import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { LogsMapper } from 'mapper';
import { LogModel } from 'models';
import { verifyAdmin } from 'ressources/middleware';
import { withSessionApi } from 'services/session.service';

interface Data extends DefaultResponse {
  logs: Logs;
  query?: any;
}

handler.get(verifyAdmin, async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { start, limit } = req.query;

  const logs: Logs = LogsMapper.many(
    await LogModel.show({ limit: +limit || 20, skip: +start })
  );

  res.send({ success: true, query: req.query, logs });
});

export default withSessionApi(handler);
