import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';

import router from '@lib/router/router';
import { sessionOptions } from '@lib/session';

router.post(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();

  res.send({ success: true });
});

export default withIronSessionApiRoute((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
}, sessionOptions);
