import { PrismaUser } from 'prisma/app';
import Mapper from 'class/Mapper';
import { entriesMapper, postsMapper } from 'mappers';

class UsersMapper extends Mapper<PrismaUser, User> {
  public one(resource: PrismaUser): User {
    const user: User = {
      id: resource.id,
      username: resource.username,
      email: resource.email,
      slug: resource.slug,
      isAdmin: resource.isAdmin,
      bio: resource.bio,
      birthday: resource.birthday && resource.birthday.toISOString(),
      city: resource.city,
      gender: resource.gender,
      followCount: resource.followCount,
      followerCount: resource.followerCount,
      avatarPath: resource.avatarPath,
      backgroundPath: resource.backgroundPath,
      createdAt: resource.createdAt.toISOString(),
      updatedAt: resource.updatedAt.toISOString(),
    };

    if (resource.entries) user.entries = entriesMapper.many(resource.entries);
    if (resource.posts) user.posts = postsMapper.many(resource.posts);

    return user;
  }
}

export default new UsersMapper();
