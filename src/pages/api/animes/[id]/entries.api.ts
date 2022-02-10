import type { NextApiRequest, NextApiResponse } from 'next';
import type { Entry } from '@prisma/client';

import { DefaultResponseData } from '@types';
import handler, { verifyUser } from '@lib/routing';
import { AnimeModel, EntryModel } from '@models';
import { ApiError } from '@errors';
import { withSessionApi } from '@services/session';
import { errorMessage } from '@lib/constants';
import { EntriesMapper } from '@mapper';

interface Data extends DefaultResponseData {
  animeUser: Entry;
}

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const data = {
    userId: +userId,
    animeId: +animeId,
    ...req.body,
  };

  const animeUser = await EntryModel.upsert(data);

  res.send({ success: true, animeUser });
};

handler.post(verifyUser, createOrUpdate);
handler.patch(verifyUser, createOrUpdate);

handler.get(verifyUser, async (req, res) => {
  const { id: animeId } = req.query;

  const entry = EntriesMapper.one(
    await EntryModel.unique(+req.session.user.id, +animeId)
  );

  res.send({ success: true, entry });
});

handler.delete(verifyUser, async (req, res) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const animeUser = await EntryModel.delete(userId, +animeId);

  res.status(204).send({ success: true, animeUser });
});

export default withSessionApi(handler);
