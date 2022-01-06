import type { NextApiRequest, NextApiResponse } from 'next';

import { Users, DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel, UserModel } from '@models';
import { UsersMapper } from '@mapper';
import { ApiError } from '@errors';

interface Data extends DefaultResponseData {
  users: Users;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const anime = await AnimeModel.findById(+id);
  if (!anime) throw new ApiError(404, 'anime not found');

  const users = UsersMapper.many(await UserModel.findByAnime(+id)).map(([user]) => user);

  res.send({ success: true, users, params: req.query });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
