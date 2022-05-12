import { PrismaSaga, PrismaSagas } from 'prisma/app';
import { formatDateTime } from 'utils/date';
import jsonParser from 'utils/jsonParser';
import { AnimesMapper } from './index';

class SagasMapper implements Mapper<PrismaSaga, Saga> {
  one(resource: PrismaSaga): Saga {
    if (!resource) return null;

    const saga: Saga = {
      id: resource.id,
      slug: resource.slug,
      canonical_title: '',
      titles: jsonParser<Titles>(resource.titles),
      description: resource.description,
      created_at: formatDateTime(resource.created_at),
      updated_at: formatDateTime(resource.updated_at),
    };

    if (resource.animes) saga.animes = AnimesMapper.many(resource.animes);

    return saga;
  }

  many(resources: PrismaSagas): Sagas {
    return resources.map((resource) => this.one(resource));
  }
}

export default new SagasMapper();
