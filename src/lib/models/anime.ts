import { Prisma, Anime } from '@prisma/client';

import connexion, { ConnexionType } from '@services/connexion';
import Model from '@lib/models/model';

type params = {
  limit?: number;
  skip?: number;
};

class AnimeModel extends Model<Prisma.AnimeDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.anime);
  }

  public findById = (id: number): Promise<Anime> =>
    this.connexion.findUnique({
      where: { id: id },
    });

  public findBySlug = (slug: string): Promise<Anime> =>
    this.connexion.findUnique({
      where: { slug },
    });

  public getMany = (params?: params): Promise<Array<Anime>> =>
    this.connexion.findMany({
      take: params.limit || 10,
      skip: params.skip || 0,
    });

  public findByUser = (userId: number): Promise<Array<Anime>> =>
    this.connexion.findMany({
      where: {
        users: { some: { user_id: userId } },
      },
    });

  public search = (query: string, params?: params): Promise<Array<Anime>> =>
    this.connexion.findMany({
      where: {
        OR: {
          canonical_title: { contains: query },
          titles: { contains: query },
        },
      },
      take: params.limit || 10,
      skip: params.skip || 0,
    });

  public count = () => this.connexion.count({});
}

export default new AnimeModel(connexion);
