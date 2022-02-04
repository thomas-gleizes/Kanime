import { NextApiRequest, NextApiResponse } from 'next';

import { DefaultResponseData, Animes } from '@types';
import router from '@lib/routing/handler';
import { UserModel, AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { ApiError } from '@errors';
import { errorMessage } from '@lib/constants';

interface Data extends DefaultResponseData {
  animes: Animes;
  length: number;
}

router.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const user = await UserModel.findById(+id);
  if (!user) throw new ApiError(404, errorMessage.USER_NOT_FOUND);

  const animes = AnimesMapper.many(await AnimeModel.findByUser(+id));

  res.send({ success: true, animes: animes, length: animes.length });
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  router.handler(req, res);
}
