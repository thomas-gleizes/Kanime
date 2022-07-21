import { PrismaUser, PrismaUsers } from 'prisma/app';
import { EntriesMapper, PostsMapper } from 'mappers';

class UsersMapper implements Mapper<PrismaUser, User> {
  public one(resource: PrismaUser): User {
    const user: User = {
      id: resource.id,
      username: resource.username,
      email: resource.email,
      slug: resource.slug,
      isAdmin: resource.is_admin,
      bio: resource.bio,
      birthday: resource.birthday && resource.birthday.toISOString(),
      city: resource.city,
      gender: resource.gender,
      followCount: resource.follow_count,
      followerCount: resource.follower_count,
      avatarPath: resource.avatar_path,
      backgroundPath: resource.background_path,
      createdAt: resource.created_at.toISOString(),
      updatedAt: resource.updated_at.toISOString(),
    };

    if (resource.entries) user.entries = EntriesMapper.many(resource.entries);
    if (resource.posts) user.posts = PostsMapper.many(resource.posts);

    return user;
  }

  public many(resources: PrismaUsers): Users {
    return resources.map(this.one);
  }
}

export default new UsersMapper();
