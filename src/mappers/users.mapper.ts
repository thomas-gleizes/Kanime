import { PrismaUser } from 'prisma/app';
import Mapper from 'class/Mapper';
import { EntriesMapper, PostsMapper } from 'mappers';

class UsersMapper extends Mapper<PrismaUser, User> {
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
}

export default new UsersMapper();
