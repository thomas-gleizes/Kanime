import type { NextApiRequest, NextApiResponse } from 'next';
import type { AnimeUserStatus } from '@prisma/client';

import { DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel, AnimeUserModel } from '@models';
import { ApiError } from '@errors';
import { verifyUser, withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {}

router.post(verifyUser, async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id: animeId, status } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, 'anime not found');

  await AnimeUserModel.create(userId, +animeId, status as AnimeUserStatus);

  res.send({ success: true });
});

export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
