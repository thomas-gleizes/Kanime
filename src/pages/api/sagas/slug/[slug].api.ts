import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagasMapper } from 'mappers';
import { SagaModel } from 'models';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<{ saga: Saga }>) => {
  const { slug } = req.query;

  const saga = SagasMapper.one(await SagaModel.findBySlug(slug as string));

  return res.json({ success: true, saga });
});

export default withSessionApi(handler);
