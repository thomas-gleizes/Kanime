import { PrismaReaction, PrismaReactions } from 'prisma/app';
import { formatDateTime } from 'utils/momentFr';
import AnimesMapper from './animes';
import UsersMapper from './users';

class LogsMapper implements Mapper<PrismaReaction, Reaction> {
  one(resource: PrismaReaction): Reaction {
    if (!resource) return null;

    const reaction: Reaction = {
      id: resource.id,
      animeId: resource.anime_id,
      userId: resource.user_id,
      content: resource.content,
      idParent: resource.parent_id,
      createdAt: formatDateTime(resource.created_at),
      updateAt: formatDateTime(resource.updated_at),
    };

    if (resource.anime) reaction.anime = AnimesMapper.one(resource.anime);
    if (resource.replyTo) reaction.replyTo = this.one(resource.replyTo);
    if (resource.replies) reaction.replies = this.many(resource.replies);

    if (resource.user) {
      const [user] = UsersMapper.one(resource.user);
      reaction.user = user;
    }

    return reaction;
  }

  many(resources: PrismaReactions): Reactions {
    return resources.map((ressource) => this.one(ressource));
  }
}

export default new LogsMapper();
