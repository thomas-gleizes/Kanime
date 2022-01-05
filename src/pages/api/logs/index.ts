import type { NextApiRequest, NextApiResponse } from 'next';

import { verifyAdmin, withSessionApi } from '@services/session';
import router from '@lib/routing/router';

router.get(verifyAdmin, async (req: NextApiRequest, res: NextApiResponse) => {
  const { start, limit } = req.query;

  res.send({ success: true, start, limit, logs: [] });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
