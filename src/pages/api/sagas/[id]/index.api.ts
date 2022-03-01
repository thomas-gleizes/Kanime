import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagaModel } from 'models';
import { SagasMapper } from 'mapper';
import ApiError from 'class/error/ApiError';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const saga = SagasMapper.one(await SagaModel.findById(+id));

  if (!saga) throw new ApiError(404, 'Saga not found');

  res.send({ success: true, saga });
});

export default withSessionApi(handler);
