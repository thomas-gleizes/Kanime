import { ApiService } from 'services/api.service';
import { routes } from 'ressources/routes';

export const get = (id: number) => ApiService.get(routes.animes.api.entries(id));
