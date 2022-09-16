import { PrismaSaga } from 'prisma/app';
import Mapper from 'class/Mapper';
import { animesMapper } from 'mappers';
import jsonParser from 'utils/jsonParser';

class SagasMapper extends Mapper<PrismaSaga, Saga> {
  one(resource: PrismaSaga): Saga {
    const saga: Saga = {
      id: resource.id,
      slug: resource.slug,
      canonicalTitle: resource.canonical_title,
      titles: jsonParser<Titles>(resource.titles),
      description: resource.description,
      created_at: resource.created_at.toISOString(),
      updated_at: resource.updated_at.toISOString(),
    };

    if (resource.animes) saga.animes = animesMapper.many(resource.animes);

    return saga;
  }
}

export default new SagasMapper();
