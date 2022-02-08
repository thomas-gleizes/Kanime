import type { NextApiRequest, NextApiResponse } from 'next';

import { Users, DefaultResponseData } from '@types';
import handler from '@lib/routing/handler';
import { AnimeModel, UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';
import { withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {
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
