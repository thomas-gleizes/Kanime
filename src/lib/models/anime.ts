import { Anime, Prisma } from '@prisma/client';

import connexion, { ConnexionType } from '@services/connexion';
import Model from '@lib/models/model';
import { ModelParams } from '@types';

class AnimeModel extends Model<Prisma.AnimeDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.anime);
  }

  public findById = (id: number): Promise<Anime> =>
    this.model.findUnique({
      where: { id: id },
    });

  public findBySlug = (slug: string): Promise<Anime> =>
    this.model.findUnique({
      where: { slug },
    });

  public all = (params?: ModelParams, userId?: number): Promise<Array<Anime>> =>
    this.model.findMany({
      ...this.getKeyParams(params),
      include: {
        users: {
          where: {
            user_id: userId || 0,
          },
        },
      },
    });

  public findByUser = (userId: number, params?: ModelParams): Promise<Array<Anime>> =>
    this.model.findMany({
      where: {
        users: { some: { user_id: userId } },
      },
      ...this.getKeyParams(params),
    });

  public search = (query: string, params?: ModelParams): Promise<Array<Anime>> =>
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
