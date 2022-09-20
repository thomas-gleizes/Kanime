import { Get, ParseNumberPipe, Query } from 'next-api-decorators';

import { apiHandler } from 'services/handler.service';
import ApiHandler from 'class/ApiHandler';
import { categoriesMapper } from 'mappers';
import { categoryModel } from 'models';

class AnimesCategoriesHandler extends ApiHandler {
  @Get()
  async showCategories(
    @Query('id', ParseNumberPipe) id: number
  ): Promise<ShowAnimeCategoriesResponse> {
    const categories = await categoryModel.findByAnimeId(id);

    return { success: true, categories: categoriesMapper.many(categories) };
  }
}

export default apiHandler(AnimesCategoriesHandler);
