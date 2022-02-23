import { PrismaClient } from '@prisma/client';

export type ConnexionType = PrismaClient;

class ConnexionService extends PrismaClient {
  private static _instance;

  private constructor() {
    super();
  }

  public static create() {
    if (this._instance == null) {
      this._instance = new ConnexionService();
    }
    return this._instance;
  }
}
// todo fix it on test
//export default ConnexionService.create();

export default new PrismaClient();
