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
      totalMediaCount: resource.total_media_count,
    };
  }
}

export default new CategoriesMapper();
