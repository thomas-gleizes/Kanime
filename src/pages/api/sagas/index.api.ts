import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  res.send({ success: true });
});

export default withSessionApi(handler);
