import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagasMapper } from '../../../../mappers';
import { SagaModel } from 'models';

interface ResponseData extends DefaultResponseData {
  saga: Saga;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { slug } = req.query;

  const saga = SagasMapper.one(await SagaModel.findBySlug(slug as string));

  res.json({ success: true, saga });
});

export default withSessionApi(handler);
