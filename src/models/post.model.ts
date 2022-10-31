import { PrismaPost, PrismaPostsDelegate, PrismaPosts } from 'app/prisma'
import connexion, { ConnexionType } from 'services/connexion.service'
import Model from 'class/Model'

type createData = {
  animeId: number
  userId: number
  content: string
  parentId?: number
}

class PostModel extends Model<PrismaPostsDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'post')
  }

  public all = (params: modelParams): Promise<PrismaPosts> =>
    this.model.findMany({ orderBy: [{ id: 'asc' }], ...this.getKeyParams(params) })

  public findById = (id: number): Promise<PrismaPost> =>
    this.model.findUnique({
      where: { id },
      include: { replyTo: true, replies: true, user: true, anime: true }
    })

  public findByAnimeIdAndUserId = (
    animeId: number,
    userId: number
  ): Promise<PrismaPost> =>
    this.model.findFirst({
      where: { animeId, userId }
    })

  public findByAnimes = (animeId: number, params?: modelParams): Promise<PrismaPosts> =>
    this.model.findMany({
      where: {
        AND: [{ animeId }, { parentId: null }]
      },
      include: { user: true, replies: { include: { replies: true } } },
      ...this.getKeyParams(params)
    })

  public findByUser = (userId: number): Promise<PrismaPosts> =>
    this.model.findMany({ where: { userId }, include: { anime: true } })

  public findReplies = (id: number): Promise<PrismaPosts> =>
    this.model.findMany({ where: { parentId: id }, include: { user: true } })

  public create = (data: createData): Promise<PrismaPost> =>
    this.model.create({
      data: {
        animeId: data.animeId,
        userId: data.userId,
        content: data.content,
        parentId: data.parentId
      }
    })

  public deleteParent = (id: number): Promise<any> =>
    this.model.updateMany({ where: { parentId: id }, data: { parentId: null } })

  public delete = (id: number): Promise<PrismaPost> =>
    this.model.delete({ where: { id } })
}

export default new PostModel(connexion)
