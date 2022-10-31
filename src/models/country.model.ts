import { PrismaCountryDelegate, PrismaCountries } from 'app/prisma'
import connexion, { ConnexionType } from 'services/connexion.service'
import Model from 'class/Model'

class CountryModel extends Model<PrismaCountryDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'country')
  }

  public all = (): Promise<PrismaCountries> => this.model.findMany({})
}

export default new CountryModel(connexion)
