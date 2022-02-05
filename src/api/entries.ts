import appAxios from '@lib/axios/appAxios';
import { routes } from '@lib/constants';

export const get = (id: number) => appAxios.get(routes.animes.api.entries(id));
