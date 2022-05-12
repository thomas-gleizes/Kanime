import { ApiRequest, ApiResponse } from 'app/next';
import { apiHandler } from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { CategoriesMapper } from '../../../../mappers';
import { CategoryModel } from 'models';

const handler = apiHandler();

handler.get(async (req: ApiRequest, res: ApiResponse<AnimeCategories>) => {
  const { id } = req.query;

  const categories = CategoriesMapper.many(await CategoryModel.findByAnimeId(+id));

  res.json({ success: true, categories, params: req.query });
});

export default withSessionApi(handler);
