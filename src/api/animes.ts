import appAxios from '@lib/axios/appAxios';
import { routes } from '@lib/constants';
import { AxiosRes, modelParams, ResAnimes, ResAnimesSearch } from '@types';

const path: string = routes.animes.index;

export const search = (query: string, params?: modelParams): AxiosRes<ResAnimesSearch> =>
  appAxios.get(`${path}/search`, {
    params: { query, ...params },
  });

export const all = (params?: modelParams): AxiosRes<ResAnimes> =>
  appAxios.get(path, { params });
