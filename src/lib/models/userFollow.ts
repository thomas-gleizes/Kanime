import connexion from '../services/connexion';

const { userFollow } = connexion;

export const createFollow = (followerId: number, followId: number): Promise<any> =>
  userFollow.create({
    data: {
      follower_id: followerId,
      follow_id: followId,
    },
  });

export const deleteFollow = (
  followerId: number,
  followId: number
): Promise<{ count: number }> =>
  userFollow.deleteMany({
    where: {
      AND: {
        follower_id: followerId,
        follow_id: followId,
      },
    },
  });
