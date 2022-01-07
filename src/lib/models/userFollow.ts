import { Prisma, UserFollow } from '@prisma/client';

import Model from '@lib/models/model';
import connexion, { ConnexionType } from '@services/connexion';

class UserFollowModel extends Model<Prisma.UserFollowDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.userFollow);
  }

  public create = (followerId: number, followId: number): Promise<UserFollow> =>
    this.connexion.create({
      data: {
        follower_id: followerId,
        follow_id: followId,
      },
    });

  public delete = (followerId: number, followId: number): Promise<UserFollow> =>
    this.connexion.delete({
      where: {
        follower_id_follow_id: {
          follower_id: followerId,
          follow_id: followId,
        },
      },
    });
}

export default new UserFollowModel(connexion);
