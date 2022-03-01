import type { NextApiRequest, NextApiResponse } from 'next';

import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { CategoriesMapper } from 'mapper';
import { CategoryModel } from 'models';

interface Data extends DefaultResponse {
  categories: Category[];
}

handler.get(async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  const categories: any[] = CategoriesMapper.many(await CategoryModel.findByAnimeId(+id));

  res.send({ success: true, categories, params: req.query });
});

export default withSessionApi(handler);
