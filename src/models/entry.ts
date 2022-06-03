import { PrismaEntry, PrismaEntryDelegate, PrismaEntryInclude } from 'prisma/app';
import { Visibility } from 'app/model';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

export type upsertData = {
  userId: number;
  animeId: number;
  status: EntryStatus;
  rating: number | null;
  progress: number;
  note: string;
  startAt: Date;
  finishAt: Date;
  visibility: Visibility;
};

class EntryModel extends Model<PrismaEntryDelegate> {
  constructor(connexion: ConnexionType) {
    super(connexion.entry);
  }

  public unique = (userId: number, animeId: number): Promise<PrismaEntry> =>
    this.model.findUnique({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });

  public upsert = ({ userId, animeId, ...data }: upsertData): Promise<PrismaEntry> =>
    this.model.upsert({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
      update: {
        status: data.status,
        rating: data.rating,
        progress: data.progress,
        note: data.note,
        started_at: data.startAt,
        finish_at: data.finishAt,
        visibility: data.visibility,
      },
      create: {
        anime_id: animeId,
        user_id: userId,
        status: data.status,
        rating: data.rating,
        progress: data.progress,
        note: data.note,
        started_at: data.startAt,
        finish_at: data.finishAt,
        visibility: data.visibility,
      },
    });

  public delete = (userId: number, animeId: number): Promise<PrismaEntry> =>
    this.model.delete({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });

  public get = (userId: number, animeId: number): Promise<PrismaEntry> =>
    this.model.findUnique({
      where: {
        anime_id_user_id: {
          anime_id: animeId,
          user_id: userId,
        },
      },
    });

  public getByUser = (
    userId: number,
    visibility: Visibility[],
    options?: ModelOptions<PrismaEntryInclude>
  ): Promise<PrismaEntry[]> =>
    this.model.findMany({
      where: {
        user_id: userId,
        visibility: { in: visibility },
      },
      orderBy: {
        updated_at: 'desc',
      },
      ...this.parseOptions(options),
    });
}

export default new EntryModel(connexion);
