import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagasMapper } from 'mapper';
import { SagaModel } from 'models';

interface ResponseData extends DefaultResponseData {
  saga: Saga;
}

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { slug } = req.query;

  const saga = SagasMapper.one(await SagaModel.findBySlug(slug as string), {
    withAnimes: true,
  });

  res.send({ success: true, saga });
});

export default withSessionApi(handler);
