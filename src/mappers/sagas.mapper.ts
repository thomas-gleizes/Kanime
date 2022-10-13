import { PrismaSaga } from 'app/prisma';
import Mapper from 'class/Mapper';
import { animesMapper } from 'mappers';
import jsonParser from 'utils/jsonParser';

class SagasMapper extends Mapper<PrismaSaga, Saga> {
  one(resource: PrismaSaga): Saga {
    const saga: Saga = {
      id: resource.id,
      slug: resource.slug,
      canonicalTitle: resource.canonicalTitle,
      titles: resource.titles ? jsonParser<Titles>(resource.titles) : null,
      description: resource.description,
      created_at: resource.createdAt.toISOString(),
      updated_at: resource.updatedAt.toISOString(),
    };

    if (resource.animes) saga.animes = animesMapper.many(resource.animes);

    return saga;
  }
}

export default new SagasMapper();
