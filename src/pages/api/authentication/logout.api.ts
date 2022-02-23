import { NextApiRequest, NextApiResponse } from 'next';

import handler from '@lib/routing';
import { withSessionApi } from '@services/session.service';

handler.all(async (req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy();

  res.send({ success: true });
});

export default withSessionApi(handler);
