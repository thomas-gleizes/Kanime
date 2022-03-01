import { PrismaAnimes, PrismaSaga } from 'prisma/app';
import { formatForMapper } from 'utils/momentFr';
import jsonParser from 'utils/jsonParser';
import AnimesMapper from './animes';

interface PSaga extends PrismaSaga {
  animes?: PrismaAnimes;
}

interface Options {
  withAnimes: boolean;
}

class SagasMapper implements Mapper<PSaga, Saga, Options> {
  one(resource: PSaga, { withAnimes }: Options): Saga {
    if (!resource) return null;

    return {
      id: resource.id,
      slug: resource.slug,
      canonical_title: '',
      titles: jsonParser<Titles>(resource.titles),
      description: resource.description,
      animes: (withAnimes && AnimesMapper.many(resource.animes || [])) || null,
      created_at: formatForMapper(resource.created_at),
      updated_at: formatForMapper(resource.updated_at),
    };
  }

  many(resources: PSaga[], options: Options): Sagas {
    return resources.map((resource) => this.one(resource, options));
  }
}

export default new SagasMapper();
