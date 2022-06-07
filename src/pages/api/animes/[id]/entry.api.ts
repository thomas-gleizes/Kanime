import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { verifyUser } from 'middlewares/auth.middleware';
import { EntryModel } from 'models';
import { EntriesMapper } from 'mappers';
import { ApiError } from 'errors';

const handler = apiHandler();

handler.get(
  verifyUser,
  async (req: ApiRequest, res: ApiResponse<{ success: true; entry: Entry }>) => {
    const entry = EntriesMapper.one(
      await EntryModel.get(req.session.user.id, +req.query.id)
    );

    if (!entry) throw new ApiError(404, 'Entry not found');

    res.send({ success: true, entry });
  }
);

export default withSessionApi(handler);
