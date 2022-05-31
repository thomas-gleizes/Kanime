import { PrismaEntry, PrismaEntryDelegate } from 'prisma/app';
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
        rating: data.rating || null,
        progress: data.progress || 0,
        note: data.note || null,
        started_at: data.startAt || null,
        finish_at: data.finishAt || null,
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

  public getByUser = (userId: number, visibility: Visibility[]): Promise<PrismaEntry[]> =>
    this.model.findMany({
      where: {
        user_id: userId,
        visibility: { in: visibility },
      },
      include: {
        anime: false,
      },
    });
}

export default new EntryModel(connexion);
