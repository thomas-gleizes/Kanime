import { PrismaReaction, PrismaReactionDelegate, PrismaReactions } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

class ReactionModal extends Model<PrismaReactionDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.reaction);
  }

  public all = (params: modelParams): Promise<PrismaReactions> =>
    this.model.findMany({ orderBy: [{ id: 'asc' }] });

  public findById = (id: number): Promise<PrismaReaction> =>
    this.model.findUnique({
      where: { id },
      include: { replyTo: true, replies: true, user: true, anime: true },
    });

  public findByAnimes = (animeId: number): Promise<PrismaReactions> =>
    this.model.findMany({
      where: {
        AND: [{ anime_id: animeId }, { parent_id: null }],
      },
      include: { user: true, replies: { include: { replies: true } } },
    });

  public findByUser = (userId: number): Promise<PrismaReactions> =>
    this.model.findMany({ where: { user_id: userId }, include: { anime: true } });

  public findReplies = (id: number): Promise<PrismaReactions> =>
    this.model.findMany({ where: { parent_id: id }, include: { user: true } });
}

export default new ReactionModal(connexion);
