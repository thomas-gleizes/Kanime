import type { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Logs } from '@types';
import { verifyAdmin, withSessionApi } from '@services/session';
import router from '@lib/routing/handler';
import { LogModel } from '@models';
import { LogsMapper } from '@mapper';

interface Data extends DefaultResponseData {
  logs: Logs;
  query?: any;
}

router.get(verifyAdmin, async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { start, limit } = req.query;

  const logs: Logs = LogsMapper.many(
    await LogModel.show({ limit: +limit || 20, skip: +start })
  );

  res.send({ success: true, query: req.query, logs });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
