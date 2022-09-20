import { AxiosInstance } from 'axios';

import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class AnimesApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'animes');
  }

  public show(params?: modelParams) {
    return this.get<AnimesListResponse>('/', { params });
  }
}

export default new AnimesApi(ApiService);
