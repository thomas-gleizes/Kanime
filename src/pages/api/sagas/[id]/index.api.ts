import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { SagaModel } from 'models';
import { SagasMapper } from 'mapper';
import { ApiError } from 'class/error';

interface ResponseData extends DefaultResponseData {
  saga: Saga;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const saga = SagasMapper.one(await SagaModel.findById(+id));

  if (!saga) throw new ApiError(404, 'Saga not found');

  res.json({ success: true, saga });
});

export default withSessionApi(handler);
