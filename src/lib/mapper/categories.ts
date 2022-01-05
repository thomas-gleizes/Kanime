import { Category as CategoryModel } from '@prisma/client';

import { Category, Mapper } from '@types';

class CategoriesMapper implements Mapper<CategoryModel, Category> {
  one(resource: CategoryModel): Category {
    if (!resource) return null;

    return {
      id: +resource.id,
      slug: resource.slug,
      name: resource.name,
      description: resource.description,
      totalMediaCount: resource.total_media_count,
    };
  }

  many(resources: Array<CategoryModel>): Array<Category> {
    return resources.map(this.one);
  }
}

export default new CategoriesMapper();
