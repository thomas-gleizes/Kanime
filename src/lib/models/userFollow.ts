import Model from '@lib/models/model';
import connexion, { ConnexionType } from '@services/connexion';

class UserFollowModel extends Model {
  public constructor(connexion: ConnexionType) {
    super(connexion.userFollow);
  }

  public createFollow = (followerId: number, followId: number): Promise<any> =>
    this.connexion.create({
      data: {
        follower_id: followerId,
        follow_id: followId,
      },
    });

  public deleteFollow = (
    followerId: number,
    followId: number
  ): Promise<{ count: number }> =>
    this.connexion.deleteMany({
      where: {
        AND: {
          follower_id: followerId,
          follow_id: followId,
        },
      },
    });
}

export default new UserFollowModel(connexion);
