import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';

handler.all(async (req: ApiRequest, res: ApiResponse) => {
  req.session.destroy();

  res.json({ success: true });
});

export default withSessionApi(handler);
