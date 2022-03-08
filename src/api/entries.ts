import { AxiosInstance } from 'axios';

import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class EntryApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(ApiService, '');
  }

  public show(id: number) {
    return this.get(`/animes/${id}/entries`);
  }
}

export default new EntryApi(ApiService);
