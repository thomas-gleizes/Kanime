import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import HttpStatus from 'resources/HttpStatus';
import { SagasMapper } from 'mappers';
import { SagaModel } from 'models';
import { ApiError } from 'errors';

interface ResponseData extends DefaultResponseData {
  sagas: Sagas;
}

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { limit, skip, query } = req.query;

  if (!query) throw new ApiError(HttpStatus.BAD_REQUEST, 'query is required');

  const sagas = SagasMapper.many(
    await SagaModel.search(query as string, { limit, skip })
  );

  res.json({ success: true, sagas });
});

export default withSessionApi(handler);
