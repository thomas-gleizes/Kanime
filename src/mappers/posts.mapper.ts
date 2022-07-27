import { PrismaPost } from 'prisma/app';
import Mapper from 'class/Mapper';
import { AnimesMapper, UsersMapper } from 'mappers';

class LogsMapper extends Mapper<PrismaPost, Post> {
  one(resource: PrismaPost): Post {
    const post: Post = {
      id: resource.id,
      animeId: resource.anime_id,
      userId: resource.user_id,
      content: resource.content,
      idParent: resource.parent_id,
      createdAt: resource.created_at.toISOString(),
      updateAt: resource.updated_at.toISOString(),
    };

    if (resource.anime) post.anime = AnimesMapper.one(resource.anime);
    if (resource.replyTo) post.replyTo = this.one(resource.replyTo);
    if (resource.replies) post.replies = this.many(resource.replies);
    if (resource.user) post.user = UsersMapper.one(resource.user);

    return post;
  }
}

export default new LogsMapper();
