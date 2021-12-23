import { NextApiRequest, NextApiResponse } from 'next';

import router from '@lib/routing/router';
import { withSessionApi } from '@lib/session';

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();

  res.send({ success: true });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
