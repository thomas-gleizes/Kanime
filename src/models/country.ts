import { PrismaCountryDelegate, PrismaCountries } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from './model';

class CountryModel extends Model<PrismaCountryDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.country);
  }

  public all = (): Promise<PrismaCountries> => this.model.findMany({});
}

export default new CountryModel(connexion);
