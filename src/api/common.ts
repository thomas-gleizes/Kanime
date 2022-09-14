import { AxiosInstance } from 'axios';

import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class UsersApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'common');
  }

  public showCountries() {
    return this.get<CountriesResponse>(`/countries`);
  }
}

export default new UsersApi(ApiService);
