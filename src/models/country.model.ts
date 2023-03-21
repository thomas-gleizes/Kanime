import { PrismaCountryDelegate, PrismaCountries } from 'app/prisma'
import Model from 'class/Model'

class CountryModel extends Model<PrismaCountryDelegate> {
  public constructor() {
    super('country')
  }

  public all = (): Promise<PrismaCountries> => this.model.findMany({})
}

export default new CountryModel()
