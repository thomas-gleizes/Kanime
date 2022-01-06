import { Category } from '@prisma/client';

import connexion, { ConnexionType } from '../services/connexion';
import Model from '@lib/models/model';

class CategoryModel extends Model {
  public constructor(connexion: ConnexionType) {
    super(connexion.category);
  }

  public findById = (id: number): Promise<Category> =>
    this.connexion.findUnique({
      where: { id: +id },
    });

  public findByAnimeId = (id: number): Promise<Array<Category>> =>
    this.connexion.findMany({
      where: {
        animes: { some: { anime_id: +id } },
      },
    });
}

export default new CategoryModel(connexion);
