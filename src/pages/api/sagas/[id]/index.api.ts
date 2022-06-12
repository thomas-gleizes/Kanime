import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { SagaModel } from 'models';
import { SagasMapper } from 'mappers';
import { ApiError } from 'errors';

interface ResponseData extends DefaultResponseData {
  saga: Saga;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const saga = await SagaModel.findById(+id);

  if (!saga) throw new ApiError(HttpStatus.NOT_FOUND, 'Saga not found');

  res.json({ success: true, saga: SagasMapper.one(saga) });
});

export default withSessionApi(handler);
