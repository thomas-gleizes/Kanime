import { Prisma, AnimeUser, AnimeUserStatus } from '@prisma/client';

import Model from '@lib/models/model';
import connexion, { ConnexionType } from '@services/connexion';

class AnimeUserModel extends Model<Prisma.AnimeUserDelegate<unknown>> {
  constructor(connexion: ConnexionType) {
    super(connexion.animeUser);
  }

  public create = (
    userId: number,
    animeId: number,
    status: AnimeUserStatus
  ): Promise<AnimeUser> =>
    this.connexion.create({
      data: { user_id: userId, anime_id: animeId, status: status },
    });

  public update = (
    userId: number,
    animeId: number,
    status: AnimeUserStatus
  ): Promise<AnimeUser> =>
    this.connexion.update({
      where: {
        AND: { user_id: userId, anime_id: animeId },
      },
    });

  public delete = (userId: number, animeId: number): Promise<{ count: number }> =>
    this.connexion.deleteMany({
      where: {
        AND: { user_id: userId, anime_id: animeId },
      },
    });
}

export default new AnimeUserModel(connexion);
