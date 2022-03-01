import { PrismaUser, PrismaUsers } from 'prisma/app';
import { formatForMapper } from 'utils/momentFr';

class UsersMapper implements Mapper<PrismaUser, [user: User, password: string]> {
  public one(resource: PrismaUser): [user: User, password: string] {
    if (resource) {
      const user: User = {
        bio: resource.bio,
        birthday: formatForMapper(resource.birthday),
        city: resource.city,
        gender: resource.gender,
        id: resource.id,
        email: resource.email,
        username: resource.username,
        isAdmin: resource.is_admin,
        followCount: resource.follow_count,
        followerCount: resource.follower_count,
        avatarPath: resource.avatar_path,
        backgroundPath: resource.background_path,
        createdAt: formatForMapper(resource.created_at),
        updatedAt: formatForMapper(resource.updated_at),
      };

      return [user, resource.password];
    } else return [null, null];
  }

  public many(resources: PrismaUsers): Array<[user: User, password: string]> {
    return resources.map(this.one);
  }
}

export default new UsersMapper();
