import { PrismaReaction, PrismaReactionDelegate, PrismaReactions } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

type createData = {
  animeId: number;
  userId: number;
  content: string;
  parentId?: number;
};

class ReactionModal extends Model<PrismaReactionDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.reaction);
  }

  public all = (params: modelParams): Promise<PrismaReactions> =>
    this.model.findMany({ orderBy: [{ id: 'asc' }], ...this.getKeyParams(params) });

  public findById = (id: number): Promise<PrismaReaction> =>
    this.model.findUnique({
      where: { id },
      include: { replyTo: true, replies: true, user: true, anime: true },
    });

  public findByAnimeIdAndUserId = (
    animeId: number,
    userId: number
  ): Promise<PrismaReaction> =>
    this.model.findFirst({
      where: { anime_id: animeId, user_id: userId },
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

  public create = (data: createData): Promise<PrismaReaction> =>
    this.model.create({
      data: {
        anime_id: data.animeId,
        user_id: data.userId,
        content: data.content,
        parent_id: data.parentId,
      },
    });

  public deleteParent = (id: number): Promise<any> =>
    this.model.updateMany({ where: { parent_id: id }, data: { parent_id: null } });

  public delete = (id: number): Promise<PrismaReaction> =>
    this.model.delete({ where: { id } });
}

export default new ReactionModal(connexion);
