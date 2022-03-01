import { ApiService } from 'services/api.service';
import { routes } from 'ressources/routes';

export const search = (query: string, params?: modelParams) =>
  ApiService.get(routes.animes.api.search, {
    params: { query, ...params },
  });

export const all = (params?: modelParams) =>
  ApiService.get(routes.animes.api.list, { params });
