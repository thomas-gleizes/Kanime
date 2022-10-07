import { PrismaCategory } from 'prisma/app';
import Mapper from 'class/Mapper';

class CategoriesMapper extends Mapper<PrismaCategory, Category> {
  one(resource: PrismaCategory): Category {
    if (!resource) return null;

    return {
      id: +resource.id,
      slug: resource.slug,
      name: resource.name,
      description: resource.description,
      totalMediaCount: resource.totalMediaCount,
    };
  }
}

export default new CategoriesMapper();
