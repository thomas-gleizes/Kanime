import { AxiosInstance } from 'axios';

import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class AnimesApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'animes');
  }

  public showAll(params?: modelParams) {
    return this.get<AnimesListResponse>('/', { params });
  }

  public search(query, params?: modelParams) {
    return this.get<AnimesSearchResponse>('/search', { params: { query, ...params } });
  }
}

export default new AnimesApi(ApiService);
