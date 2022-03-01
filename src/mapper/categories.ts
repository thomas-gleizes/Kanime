import { PrismaCategories, PrismaCategory } from 'prisma/app';

class CategoriesMapper implements Mapper<PrismaCategory, Category> {
  one(resource: PrismaCategory): Category {
    if (!resource) return null;

    return {
      id: +resource.id,
      slug: resource.slug,
      name: resource.name,
      description: resource.description,
      totalMediaCount: resource.total_media_count,
    };
  }

  many(resources: PrismaCategories): Categories {
    return resources.map(this.one);
  }
}

export default new CategoriesMapper();
