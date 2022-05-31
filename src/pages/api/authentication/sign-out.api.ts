import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

const handler = apiHandler();

handler.all(async (req: ApiRequest, res: ApiResponse) => {
  req.session.destroy();

  res.json({ success: true });
});

export default withSessionApi(handler);
