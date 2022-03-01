import { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { UserModel, AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import { errorMessage } from 'ressources/constants';
import ApiError from 'class/error/ApiError';

interface Data extends DefaultResponse {
  animes: Animes;
  length: number;
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const animes = AnimesMapper.many(await AnimeModel.findByUser(+id));

  res.send({ success: true, animes: animes, length: animes.length });
});

export default withSessionApi(handler);
