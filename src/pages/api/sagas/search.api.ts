import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagasMapper } from 'mapper';
import { SagaModel } from 'models';
import ApiError from 'class/error/ApiError';

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(400, 'query is required');

  const sagas = SagasMapper.many(
    await SagaModel.search(query as string, { limit, skip }),
    { withAnimes: true }
  );

  console.log('Ani', sagas);

  res.status(200).send({
    success: true,
    sagas,
  });

  return {
    status: 200,
    data: { success: true, sagas },
  };
});

export default withSessionApi(handler);
