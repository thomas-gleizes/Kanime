import { PrismaClient } from '@prisma/client';

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

export default Connexion.create();
