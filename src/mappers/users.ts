import { PrismaUser, PrismaUsers } from 'prisma/app';
import { EntriesMapper, PostsMapper } from 'mappers';

class UsersMapper implements Mapper<PrismaUser, [user: User, password: string]> {
  public one(resource: PrismaUser): [user: User, password: string] {
    if (resource) {
      const user: User = {
        bio: resource.bio,
        birthday: resource.birthday && resource.birthday.toISOString(),
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
        createdAt: resource.created_at.toISOString(),
        updatedAt: resource.updated_at.toISOString(),
      };

      if (resource.entries) user.entries = EntriesMapper.many(resource.entries);
      if (resource.posts) user.posts = PostsMapper.many(resource.posts);

      return [user, resource.password];
    } else return [null, null];
  }

  public many(resources: PrismaUsers): Array<[user: User, password: string]> {
    return resources.map(this.one);
  }
}

export default new UsersMapper();
