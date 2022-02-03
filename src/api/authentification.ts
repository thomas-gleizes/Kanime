import appAxios from '@lib/api/appAxios';
import { routes } from '@lib/constants';

const path = routes.authentication;

export const login = () => appAxios.get(path + '');
