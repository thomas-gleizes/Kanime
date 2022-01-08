import { Prisma, Category } from '@prisma/client';

import connexion, { ConnexionType } from '../services/connexion';
import Model from '@lib/models/model';
import { ModelParams } from '@types';

class CategoryModel extends Model<Prisma.CategoryDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.category);
  }

  public findById = (id: number): Promise<Category> =>
    this.model.findUnique({
      where: { id: +id },
    });

  public findByAnimeId = (id: number, params?: ModelParams): Promise<Array<Category>> =>
    this.model.findMany({
      where: {
        animes: { some: { anime_id: +id } },
      },
      ...this.getKeyParams(params)
    });
}

export default new CategoryModel(connexion);
