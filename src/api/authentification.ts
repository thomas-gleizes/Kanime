import appAxios from '@lib/api/appAxios';
import { routes } from '@lib/constants';
import { AxiosRes } from '@types';

const path = routes.authentication;

export const login = (data: any): AxiosRes<any> => appAxios.get(`${path}/login`);

export const register = (data: any): AxiosRes<any> => appAxios.get(`${path}/register`);
