import {
  PrismaEntry,
  PrismaEntryDelegate,
  PrismaEntryInclude,
  PrismaEntryStatus
} from 'app/prisma'
import { Visibility } from 'app/model'
import connexion, { ConnexionType } from 'services/connexion.service'
import Model from 'class/Model'
import { CreateEntryDto, UpdateEntryDto } from 'dto/entry.dto'

class EntryModel extends Model<PrismaEntryDelegate> {
  constructor(connexion: ConnexionType) {
    super(connexion, 'entry')
  }

  public all = (params?: modelParams) =>
    this.model.findMany({
      ...this.getKeyParams(params)
    })

  public find = (id: number) =>
    this.model.findUnique({
      where: { id }
    })

  public findWithAnime = (id: number) =>
    this.model.findUnique({ where: { id }, include: { anime: true } })

  public findWithUser = (id: number) =>
    this.model.findUnique({ where: { id }, include: { user: true } })

  public unique = (userId: number, animeId: number) =>
    this.model.findUnique({
      where: {
        animeId_userId: {
          userId,
          animeId
        }
      }
    })

  public create = (userId: number, data: CreateEntryDto) =>
    this.model.create({
      data: {
        animeId: data.animeId,
        userId: userId,
        status: data.status,
        rating: data.rating,
        progress: data.progress,
        note: data.note,
        startedAt: data.startedAt ? new Date(data.startedAt) : null,
        finishAt: data.finishAt ? new Date(data.finishAt) : null,
        visibility: data.visibility
      }
    })

  public update = (id: number, data: UpdateEntryDto) =>
    this.model.update({
      where: { id },
      data: {
        status: data.status,
        rating: data.rating,
        progress: data.progress,
        note: data.note,
        startedAt: data.startedAt ? new Date(data.startedAt) : null,
        finishAt: data.finishAt ? new Date(data.finishAt) : null,
        visibility: data.visibility
      }
    })

  public delete = (id: number): Promise<PrismaEntry> =>
    this.model.delete({
      where: { id }
    })

  public get = (userId: number, animeId: number) =>
    this.model.findUnique({
      where: {
        animeId_userId: {
          animeId,
          userId
        }
      }
    })

  public getByUser = (
    userId: number,
    visibility: Visibility[],
    status: PrismaEntryStatus | undefined,
    orderBy:
      | {
          field: 'rating' | 'progress' | 'started_at' | 'finish_at'
          order: 'asc' | 'desc'
        }
      | undefined,
    options?: ModelOptions<PrismaEntryInclude>
  ) => {
    return this.model.findMany({
      where: {
        userId,
        visibility: { in: visibility },
        status: status || undefined
      },
      orderBy: [{ [orderBy?.field]: orderBy?.order }, { updatedAt: 'desc' }],
      ...this.parseOptions(options)
    })
  }

  public getByAnimes = (
    animeId: number,
    visibility: Visibility[],
    status: PrismaEntryStatus | undefined,
    orderBy:
      | {
          field: 'rating' | 'progress' | 'started_at' | 'finish_at'
          order: 'asc' | 'desc'
        }
      | undefined,
    options?: ModelOptions<PrismaEntryInclude>
  ): Promise<PrismaEntry[]> =>
    this.model.findMany({
      where: {
        animeId,
        visibility: { in: visibility },
        status: status || undefined
      },
      orderBy: [{ [orderBy.field]: orderBy.order }, { updatedAt: 'desc' }],
      ...this.parseOptions(options)
    })
}

export default new EntryModel(connexion)
