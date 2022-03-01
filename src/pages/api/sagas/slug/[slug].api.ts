import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagasMapper } from 'mapper';
import { SagaModel } from 'models';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  const saga = SagasMapper.one(await SagaModel.findBySlug(slug as string));

  res.send({ success: true, saga });
});

export default withSessionApi(handler);
