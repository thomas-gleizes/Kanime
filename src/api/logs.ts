import { AxiosInstance } from 'axios'

import Api from 'class/Api'
import { ApiService } from 'services/api.service'

class LogsApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'logs')
  }

  public showAll(params?: modelParams) {
    return this.get<LogsResponse>('/', { params })
  }
}

export default new LogsApi(ApiService)
