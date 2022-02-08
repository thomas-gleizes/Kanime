import type { NextApiRequest, NextApiResponse } from 'next';

import { Category, DefaultResponseData } from '@types';
import handler from '@lib/routing';
import { CategoryModel } from '@models';
import { CategoriesMapper } from '@mapper';
import { withSessionApi } from '@services/session';

interface Data extends DefaultResponseData {
  categories: Category[];
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const categories: any[] = CategoriesMapper.many(await CategoryModel.findByAnimeId(+id));

  res.send({ success: true, categories, params: req.query });
});

export default withSessionApi(handler);
