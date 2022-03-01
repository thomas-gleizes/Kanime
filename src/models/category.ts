import { PrismaCategoryDelegate, PrismaCategories, PrismaCategory } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from './model';

class CategoryModel extends Model<PrismaCategoryDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.category);
  }

  public findById = (id: number): Promise<PrismaCategory> =>
    this.model.findUnique({
      where: { id: +id },
    });

  public findByAnimeId = (id: number, params?: modelParams): Promise<PrismaCategories> =>
    this.model.findMany({
      where: {
        animes: { some: { anime_id: +id } },
      },
      ...this.getKeyParams(params),
    });
}

export default new CategoryModel(connexion);
