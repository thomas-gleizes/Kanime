import { PrismaCategoryDelegate } from 'app/prisma';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

class CategoryModel extends Model<PrismaCategoryDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'category');
  }

  public findById = (id: number) =>
    this.model.findUnique({
      where: { id },
    });

  public findByAnimeId = (id: number, params?: modelParams) =>
    this.model.findMany({
      where: {
        animes: { some: { animeId: +id } },
      },
      ...this.getKeyParams(params),
    });
}

export default new CategoryModel(connexion);
