import { PrismaClient } from '@prisma/client'

export type ConnexionType = PrismaClient

class ConnexionService extends PrismaClient {
  private static _instance: ConnexionService

  private constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL
        }
      }
    })
  }

  public static create() {
    if (this._instance == null) {
      this._instance = new ConnexionService()
    }
    return this._instance
  }
}

export default process.env.NODE_ENV !== 'test' ? ConnexionService.create() : new PrismaClient()
