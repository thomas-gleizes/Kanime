import { PrismaSagaDelegate } from 'app/prisma'

import Model from 'class/Model'

class SagaModel extends Model<PrismaSagaDelegate> {
  public constructor() {
    super('saga')
  }

  public all = (params: modelParams) => this.model.findMany({ orderBy: [{ id: 'asc' }] })

  public findById = (id: number) =>
    this.model.findUnique({ where: { id }, include: { animes: true } })

  public findBySlug = (slug: string) =>
    this.model.findUnique({ where: { slug }, include: { animes: true } })

  public search = (query: string, params: modelParams) =>
    this.model.findMany({
      where: {
        OR: [
          { canonicalTitle: { contains: query } },
          { slug: { contains: query } },
          { titles: { contains: query } }
        ]
      },
      include: { animes: true },
      ...this.getKeyParams(params)
    })
}

export default new SagaModel()
