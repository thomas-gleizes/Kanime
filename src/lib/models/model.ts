import { Prisma, PrismaClient } from '@prisma/client';
import { ConnexionType } from '@services/connexion';

abstract class Model<D = any> {
  protected connexion: D;

  protected constructor(connexionModule: D) {
    this.connexion = connexionModule;
  }

  public count = () => this.connexion.count();

  public deleteAll = (): Promise<any> => {
    if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
      throw new Error('cannot delete all ressource in production');

    return this.connexion.deleteMany({});
  };
}

export default Model;
