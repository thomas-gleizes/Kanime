import type { NextApiRequest, NextApiResponse } from 'next';
import type { EntryStatus, Entry } from '@prisma/client';

import { DefaultResponseData } from '@types';
import router from '@lib/routing/router';
import { AnimeModel, EntryModel } from '@models';
import { ApiError } from '@errors';
import { verifyUser, withSessionApi } from '@services/session';
import { errorMessage } from '@lib/constants';
import { EntriesMapper } from '@mapper';
import anime from '@lib/models/anime';

interface Data extends DefaultResponseData {
  animeUser: Entry;
}

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;
  const { status } = req.body;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);
  if (!status) throw new ApiError(400, errorMessage.ANIME_USER_STATUS);

  const animeUser = await EntryModel.upsert(userId, +animeId, status as EntryStatus);

  res.send({ success: true, animeUser });
};

router.post(verifyUser, createOrUpdate);
router.patch(verifyUser, createOrUpdate);

router.get(verifyUser, async (req, res) => {
  const { id: animeId } = req.query;

  const entry = EntriesMapper.one(
    await EntryModel.unique(+req.session.user.id, +animeId)
  );

  res.send({ success: true, entry });
});

router.delete(verifyUser, async (req, res) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const animeUser = await EntryModel.delete(userId, +animeId);

  res.send({ success: true, animeUser });
});
export default withSessionApi((req: NextApiRequest, res: NextApiResponse) => {
  router.handler(req, res);
});
