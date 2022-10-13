import { PrismaPost } from 'app/prisma';
import Mapper from 'class/Mapper';
import { animesMapper, usersMapper } from 'mappers';

class LogsMapper extends Mapper<PrismaPost, Post> {
  one(resource: PrismaPost): Post {
    const post: Post = {
      id: resource.id,
      animeId: resource.animeId,
      userId: resource.userId,
      content: resource.content,
      idParent: resource.parentId,
      createdAt: resource.createdAt.toISOString(),
      updateAt: resource.updatedAt.toISOString(),
    };

    if (resource.anime) post.anime = animesMapper.one(resource.anime);
    if (resource.replyTo) post.replyTo = this.one(resource.replyTo);
    if (resource.replies) post.replies = this.many(resource.replies);
    if (resource.user) post.user = usersMapper.one(resource.user);

    return post;
  }
}

export default new LogsMapper();
