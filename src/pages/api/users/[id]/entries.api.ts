import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { EntryModel } from 'models';
import { EntriesMapper } from 'mappers';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<any>) => {
  const { id } = req.query;

  const entries = EntriesMapper.many(
    await EntryModel.getByUser(+id, { includes: { user: undefined } })
  );

  res.send({ success: true, entries });
});

export default withSessionApi(handler);
