import { ApiRequest, ApiResponse } from 'app/next';
import handler from 'services/handler.service';
import { withSessionApi } from 'services/session.service';
import { CategoriesMapper } from 'mapper';
import { CategoryModel } from 'models';

interface ResponseData extends DefaultResponseData {
  categories: Categories;
}

handler.get(async (req: ApiRequest, res: ApiResponse<ResponseData>) => {
  const { id } = req.query;

  const categories = CategoriesMapper.many(await CategoryModel.findByAnimeId(+id));

  res.send({ success: true, categories, params: req.query });
});

export default withSessionApi(handler);
