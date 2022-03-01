import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, UserModel } from 'models';
import { UsersMapper } from 'mapper';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface Data extends DefaultResponse {
  users: Users;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const anime = await AnimeModel.findById(+id);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const users = UsersMapper.many(await UserModel.findByAnime(+id)).map(([user]) => user);

  res.send({ success: true, users, params: req.query });
});

export default withSessionApi(handler);
