import appAxios from '@lib/api/appAxios';
import { routes } from '@lib/constants';
import { AxiosRes, modelParams, ResAnimes, ResAnimesSearch } from '@types';

const PATH: string = routes.animes;

export const search = (query: string, params?: modelParams): AxiosRes<ResAnimesSearch> =>
  appAxios.get(`${PATH}/search`, {
    params: { query, ...params },
  });

export const all = (params?: modelParams): AxiosRes<ResAnimes> =>
  appAxios.get(PATH, { params });
