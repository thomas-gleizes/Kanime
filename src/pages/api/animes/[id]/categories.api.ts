import { Get, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { CategoriesMapper } from 'mappers';
import { CategoryModel } from 'models';

class AnimesCategoriesHandler extends ApiHandler {
  @Get()
  async showCategories(@Query('id', ParseNumberPipe) id: number) {
    const categories = await CategoryModel.findByAnimeId(id);

    return { categories: CategoriesMapper.many(categories) };
  }
}

export default apiHandler(AnimesCategoriesHandler);
