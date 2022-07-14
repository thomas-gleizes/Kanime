import { PrismaAnime, PrismaAnimeDelegate, PrismaAnimes } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';
import { AnimeMiddleware } from '../mappers/prisma.middleware';

class AnimeModel extends Model<PrismaAnimeDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'anime');
  }

  public findById = (id: number): Promise<PrismaAnime> =>
    this.model.findUnique({
      where: { id },
    });

  public findByIds = (ids: number[]): Promise<PrismaAnimes> =>
    this.model.findMany({
      where: { id: { in: ids } },
    });

  public isExist = (id: number): Promise<boolean> =>
    this.model
      .findUnique({
        where: { id },
      })
      .then((res) => res !== null);

  public findBySlug = (slug: string): Promise<PrismaAnime> =>
    this.model.findUnique({
      where: { slug },
    });

  public all = (params?: modelParams): Promise<PrismaAnimes> =>
    this.model.findMany({
      ...this.getKeyParams(params),
    });

  public findByUser = (userId: number, params?: modelParams): Promise<PrismaAnimes> =>
    this.model.findMany({
      where: {
        entries: { some: { user_id: userId } },
      },
      ...this.getKeyParams(params),
    });

  public search = (query: string, params?: modelParams): Promise<PrismaAnimes> =>
    this.model.findMany({
      where: {
        OR: [
          { canonical_title: { contains: query } },
          { slug: { contains: query } },
          { titles: { contains: query } },
        ],
      },
      ...this.getKeyParams(params),
    });
}

export default new AnimeModel(connexion);
