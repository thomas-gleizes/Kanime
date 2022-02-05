import appAxios from '@lib/axios/appAxios';
import { routes } from '@lib/constants';
import { AxiosRes, modelParams, ResAnimes, ResAnimesSearch } from '@types';

export const search = (query: string, params?: modelParams): AxiosRes<ResAnimesSearch> =>
  appAxios.get(routes.animes.api.search, {
    params: { query, ...params },
  });

export const all = (params?: modelParams): AxiosRes<ResAnimes> =>
  appAxios.get(routes.animes.api.list, { params });
