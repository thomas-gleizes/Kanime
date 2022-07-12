import { PrismaCountryDelegate, PrismaCountries } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

class CountryModel extends Model<PrismaCountryDelegate, CountryModel, CountryModel, any> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'country');
  }

  public all = (): Promise<PrismaCountries> => this.model.findMany({});
}

export default new CountryModel(connexion);
