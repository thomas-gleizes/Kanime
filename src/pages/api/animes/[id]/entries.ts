import type { NextApiRequest, NextApiResponse } from 'next';
import type { AnimeUserStatus } from '@prisma/client';

import { DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel, AnimeUserModel } from '@models';
import { ApiError } from '@errors';
import { verifyUser, withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {}

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id: animeId, status } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, 'anime not found');
  if (!status) throw new ApiError(400, 'status must be a AnimeStatus');

  await AnimeUserModel.upsert(userId, +animeId, status as AnimeUserStatus);

  res.send({ success: true });
};

router.post(verifyUser, createOrUpdate);
router.patch(verifyUser, createOrUpdate);

router.delete(verifyUser, async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, 'anime not found');

  const test = await AnimeUserModel.delete(userId, +animeId);

  console.log('Test', test);

  res.send({ success: true, test });
});
export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
