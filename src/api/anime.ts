import { AxiosInstance } from 'axios'

import Api from 'class/Api'
import { ApiService } from 'services/api.service'

class AnimesApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'animes')
  }

  public show(params?: modelParams) {
    return this.get<AnimesListResponse>('/', { params })
  }

  public search(query: string, params?: modelParams) {
    return this.get<AnimesSearchResponse>('/search', { params: { query, ...params } })
  }

  public entry(id: number) {
    return this.get(`/${id}/entry`)
  }

  public entries(id: number) {
    return this.get(`/${id}/entries`)
  }
}

export default new AnimesApi(ApiService)
