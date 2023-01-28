import { PrismaAnimeDelegate } from 'app/prisma'
import connexion, { ConnexionType } from 'services/connexion.service'
import Model from 'class/Model'

class AnimeModel extends Model<PrismaAnimeDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'anime')
  }

  public findById = (id: number) =>
    this.model.findUnique({
      where: { id }
    })

  public findByIds = (ids: number[]) =>
    this.model.findMany({
      where: { id: { in: ids } }
    })

  public isExist = (id: number): Promise<boolean> =>
    this.model
      .findUnique({
        where: { id }
      })
      .then((res) => res !== null)

  public findBySlug = (slug: string) =>
    this.model.findUnique({
      where: { slug }
    })

  public all = (params?: modelParams) => this.model.findMany({ ...this.getKeyParams(params) })

  public findByUser = (userId: number, params?: modelParams) =>
    this.model.findMany({
      where: {
        entries: { some: { userId } }
      },
      ...this.getKeyParams(params)
    })

  public search = (query: string, params?: modelParams) =>
    this.model.findMany({
      where: {
        OR: [
          { canonicalTitle: { contains: query } },
          { slug: { contains: query } },
          { titles: { contains: query } }
        ]
      },
      ...this.getKeyParams(params)
    })

  public findPopular = (params?: modelParams) =>
    this.model.findMany({
      where: {
        NOT: [{ popularityRank: null }]
      },
      orderBy: {
        popularityRank: 'asc'
      },
      ...this.getKeyParams(params)
    })

  public findHighRated = (params?: modelParams) =>
    this.model.findMany({
      where: { NOT: { ratingRank: null } },
      orderBy: { ratingRank: 'asc' },
      ...this.getKeyParams(params)
    })
}

export default new AnimeModel(connexion)
