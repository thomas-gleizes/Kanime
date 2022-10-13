import { AxiosInstance } from 'axios';

import { PrismaEntryInclude, PrismaEntryStatus } from 'app/prisma';
import Api from 'class/Api';
import { ApiService } from 'services/api.service';

class UsersApi extends Api {
  constructor(apiService: AxiosInstance) {
    super(apiService, 'users');
  }

  public showEntries(
    userId: number,
    params: {
      include: PrismaEntryInclude;
      status: PrismaEntryStatus;
      orderBy: { [key: string]: 'desc' | 'asc' };
      limit?: number;
      skip?: number;
    }
  ) {
    return this.get<ShowUserEntriesResponse>(`/${userId}/entries`, { params });
  }
}

export default new UsersApi(ApiService);
