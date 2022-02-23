import { Anime, Prisma } from '@prisma/client';

import connexion, { ConnexionType } from '@services/connexion.service';
import Model from '@lib/models/model';
import { modelParams } from '@types';

class AnimeModel extends Model<Prisma.AnimeDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.anime);
  }

  public test = () => this.model;

  public findById = (id: number): Promise<Anime> =>
    this.model.findUnique({
      where: { id },
    });

  public findBySlug = (slug: string): Promise<Anime> =>
    this.model.findUnique({
      where: { slug },
    });

  public all = (params?: modelParams, userId?: number): Promise<Array<Anime>> =>
    this.model.findMany({
      include: {
        users: {
          where: { user_id: userId || 0 },
        },
      },
      ...this.getKeyParams(params),
    });

  public findByUser = (userId: number, params?: modelParams): Promise<Array<Anime>> =>
    this.model.findMany({
      where: {
        users: { some: { user_id: userId } },
      },
      ...this.getKeyParams(params),
    });

  public search = (query: string, params?: modelParams): Promise<Array<Anime>> =>
    this.model.findMany({
      where: {
        OR: [
          { canonical_title: { contains: query } },
          { slug: { contains: query } },
          { titles: { contains: query } },
        ],
      },
      ...this.getKeyParams(params),
    });
}

export default new AnimeModel(connexion);
