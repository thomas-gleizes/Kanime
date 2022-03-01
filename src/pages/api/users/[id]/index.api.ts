import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UsersMapper } from 'mapper';
import { UserModel } from 'models';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface Data extends DefaultResponse {
  user: User;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const [user] = UsersMapper.one(await UserModel.findById(+id));

  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  res.send({ success: true, user });
});

export default withSessionApi(handler);
