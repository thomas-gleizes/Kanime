import { PrismaPost, PrismaPosts } from 'prisma/app';
import { formatDateTime } from 'utils/date';
import AnimesMapper from './animes';
import UsersMapper from './users';

class LogsMapper implements Mapper<PrismaPost, Post> {
  one(resource: PrismaPost): Post {
    if (!resource) return null;

    const post: Post = {
      id: resource.id,
      animeId: resource.anime_id,
      userId: resource.user_id,
      content: resource.content,
      idParent: resource.parent_id,
      createdAt: formatDateTime(resource.created_at),
      updateAt: formatDateTime(resource.updated_at),
    };

    if (resource.anime) post.anime = AnimesMapper.one(resource.anime);
    if (resource.replyTo) post.replyTo = this.one(resource.replyTo);
    if (resource.replies) post.replies = this.many(resource.replies);

    if (resource.user) {
      const [user] = UsersMapper.one(resource.user);
      post.user = user;
    }

    return post;
  }

  many(resources: PrismaPosts): Posts {
    return resources.map((ressource) => this.one(ressource));
  }
}

export default new LogsMapper();
