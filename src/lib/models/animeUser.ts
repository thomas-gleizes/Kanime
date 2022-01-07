import { AnimeUser, AnimeUserStatus, Prisma } from '@prisma/client';

import Model from '@lib/models/model';
import connexion, { ConnexionType } from '@services/connexion';

class AnimeUserModel extends Model<Prisma.AnimeUserDelegate<unknown>> {
  constructor(connexion: ConnexionType) {
    super(connexion.animeUser);
  }

  public upsert = (
    userId: number,
    animeId: number,
    status: AnimeUserStatus
  ): Promise<AnimeUser> =>
    this.connexion.upsert({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
      update: { status: status },
      create: { anime_id: animeId, user_id: userId, status: status },
    });

  public delete = (userId: number, animeId: number): Promise<AnimeUser> =>
    this.connexion.delete({
      where: {
        anime_id_user_id: {
          user_id: userId,
          anime_id: animeId,
        },
      },
    });
}

export default new AnimeUserModel(connexion);
