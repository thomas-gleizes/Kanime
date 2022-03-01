import { PrismaSagaDelegate, PrismaSaga, PrismaSagas } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from './model';

class SagaModel extends Model<PrismaSagaDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.saga);
  }

  public all = (params: modelParams): Promise<PrismaSagas> =>
    this.model.findMany({ orderBy: [{ id: 'asc' }] });

  public findById = (id: number): Promise<PrismaSaga> =>
    this.model.findUnique({ where: { id }, include: { animes: true } });

  public findBySlug = (slug: string): Promise<PrismaSaga> =>
    this.model.findUnique({ where: { slug }, include: { animes: true } });

  public search = (query: string, params: modelParams): Promise<PrismaSagas> =>
    this.model.findMany({
      where: {
        OR: [
          { canonical_title: { contains: query } },
          { slug: { contains: query } },
          { titles: { contains: query } },
        ],
      },
      include: { animes: true },
      ...this.getKeyParams(params),
    });
}

export default new SagaModel(connexion);
