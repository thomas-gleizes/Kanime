import { PrismaAnimes, PrismaSaga } from 'prisma/app';
import { formatForMapper } from 'utils/momentFr';
import jsonParser from 'utils/jsonParser';
import AnimesMapper from './animes';

interface PSaga extends PrismaSaga {
  animes?: PrismaAnimes;
}

class SagasMapper implements Mapper<PSaga, Saga> {
  one(resource: PSaga): Saga {
    const animes = AnimesMapper.many(resource.animes);

    return {
      id: resource.id,
      slug: resource.slug,
      canonical_title: '',
      titles: jsonParser<Titles>(resource.titles),
      description: resource.description,
      animes,
      created_at: formatForMapper(resource.created_at),
      updated_at: formatForMapper(resource.updated_at),
    };
  }

  many(resources: PSaga[]): Sagas {
    return resources.map(this.one);
  }
}

export default new SagasMapper();
