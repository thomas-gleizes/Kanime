import { Category as CategoryModel } from '@prisma/client';

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

  many(resources: Array<CategoryModel>): Categories {
    return resources.map(this.one);
  }
}

export default new CategoriesMapper();
