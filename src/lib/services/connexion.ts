import { PrismaClient } from '@prisma/client';

export type ConnexionType = PrismaClient;

class Connexion extends PrismaClient {
  private static _instance;

  private constructor() {
    super();
  }

  public static create() {
    if (this._instance == null) {
      this._instance = new Connexion();
    }
    return this._instance;
  }
}
// todo fix it on test env
export default Connexion.create();

// export default new PrismaClient();
