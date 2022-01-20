import { Entry, EntryStatus, Prisma } from '@prisma/client';

import Model from '@lib/models/model';
import connexion, { ConnexionType } from '@services/connexion';

class EntryModel extends Model<Prisma.EntryDelegate<unknown>> {
  constructor(connexion: ConnexionType) {
    super(connexion.entry);
  }

  public unique = (userId: number, animeId: number): Promise<Entry> =>
    this.model.findUnique({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });

  public upsert = (
    userId: number,
    animeId: number,
    status: EntryStatus
  ): Promise<Entry> =>
    this.model.upsert({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
      update: { status: status },
      create: { anime_id: animeId, user_id: userId, status: status },
    });

  public delete = (userId: number, animeId: number): Promise<Entry> =>
    this.model.delete({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });
}

export default new EntryModel(connexion);
