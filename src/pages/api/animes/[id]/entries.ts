import type { NextApiRequest, NextApiResponse } from 'next';
import type { AnimeUserStatus, AnimeUser } from '@prisma/client';

import { DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel, AnimeUserModel } from '@models';
import { ApiError } from '@errors';
import { verifyUser, withSessionApi } from '@services/session';
import { errorMessage } from '@lib/constants';

interface Data extends DefaultResponseData {
  animeUser: AnimeUser;
}

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;
  const { status } = req.body;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);
  if (!status) throw new ApiError(400, errorMessage.ANIME_USER_STATUS);

  const animeUser = await AnimeUserModel.upsert(
    userId,
    +animeId,
    status as AnimeUserStatus
  );

  res.send({ success: true, animeUser });
};

router.post(verifyUser, createOrUpdate);
router.patch(verifyUser, createOrUpdate);

router.delete(verifyUser, async (req: NextApiRequest, res: NextApiResponse) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const animeUser = await AnimeUserModel.delete(userId, +animeId);

  res.send({ success: true, animeUser });
});
export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
