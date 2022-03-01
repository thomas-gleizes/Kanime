import appAxios from '@lib/axios/appAxios';
import { routes } from '../ressources/constants';

export const get = (id: number) => appAxios.get(routes.animes.api.entries(id));
