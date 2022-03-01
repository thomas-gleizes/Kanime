import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { AnimeModel, SagaModel } from 'models';
import { EntriesMapper } from 'mapper';
import { verifyUser } from 'ressources/middleware';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface Response extends DefaultResponse {
  entry: Entry;
}

const createOrUpdate = async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id: animeId } = req.query;
  const { id: userId } = req.session.user;

  const anime = await AnimeModel.findById(+animeId);
  if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

  const data = {
    userId: +userId,
    animeId: +animeId,
    ...req.body,
  };

  const entry = EntriesMapper.one(await SagaModel.upsert(data));

  res.send({ success: true, entry });
};

handler.post(verifyUser, createOrUpdate);
handler.patch(verifyUser, createOrUpdate);

handler.get(verifyUser, async (req: NextApiRequest, res: NextApiResponse<Response>) => {
  const { id: animeId } = req.query;

  const entry = EntriesMapper.one(await SagaModel.unique(+req.session.user.id, +animeId));

  res.send({ success: true, entry });
});

handler.delete(
  verifyUser,
  async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    const { id: animeId } = req.query;
    const { id: userId } = req.session.user;

    const anime = await AnimeModel.findById(+animeId);
    if (!anime) throw new ApiError(404, errorMessage.ANIME_NOT_FOUND);

    const entry = EntriesMapper.one(await SagaModel.delete(userId, +animeId));

    res.status(204).send({ success: true, entry });
  }
);

export default withSessionApi(handler);
