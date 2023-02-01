import { AxiosInstance } from 'axios'

import Api from 'class/Api'
import { CreateEntryDto, UpdateEntryDto } from 'dto/entry.dto'
import { ApiService } from 'services/api.service'

class EntriesApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'entries')
  }

  public getByAnime(animeId: number) {
    return this.get<any>('/')
  }

  public create(data: CreateEntryDto) {
    return this.post<any>('/', data)
  }

  public update(id: number, data: UpdateEntryDto) {
    return this.patch<any>(`/${id}`, data)
  }

  public remove(id: number) {
    return this.delete(`/${id}`)
  }
}

export default new EntriesApi(ApiService)
