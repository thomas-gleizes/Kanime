import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { ReactionModel } from 'models';
import { ReactionsMapper } from 'mapper';

interface ResponseData extends DefaultResponseData {
  reactions: Reactions;
  total: number;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  const { id } = req.query;

  const reactions = ReactionsMapper.many(await ReactionModel.findByAnimes(+id));

  res.json({ success: true, total: reactions.length, reactions });
});

export default withSessionApi(handler);
