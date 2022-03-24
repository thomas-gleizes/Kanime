import { PrismaFollow, PrismaFollowDelegate } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

class FollowModel extends Model<PrismaFollowDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.userFollow);
  }

  public create = (followerId: number, followId: number): Promise<PrismaFollow> =>
    this.model.create({
      data: {
        follower_id: followerId,
        follow_id: followId,
      },
    });

  public delete = (followerId: number, followId: number): Promise<PrismaFollow> =>
    this.model.delete({
      where: {
        follower_id_follow_id: {
          follower_id: followerId,
          follow_id: followId,
        },
      },
    });
}

export default new FollowModel(connexion);
