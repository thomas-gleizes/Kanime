import { PrismaCategoryDelegate } from 'app/prisma'
import Model from 'class/Model'

class CategoryModel extends Model<PrismaCategoryDelegate> {
  public constructor() {
    super('category')
  }

  public findById = (id: number) =>
    this.model.findUnique({
      where: { id }
    })

  public findByAnimeId = (id: number, params?: modelParams) =>
    this.model.findMany({
      where: {
        animes: { some: { animeId: +id } }
      },
      ...this.getKeyParams(params)
    })
}

export default new CategoryModel()
