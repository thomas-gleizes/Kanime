import * as Yup from 'yup';

import appAxios from '@lib/axios/appAxios';
import { routes } from '@lib/constants';
import { loginSchema, registerSchema } from '@validations/users';
import { AxiosRes, ResRegister } from '@types';

const path = routes.authentication;

export const login = (payload: Yup.TypeOf<typeof loginSchema>): AxiosRes<any> =>
  appAxios.post(`${path}/login`, payload);

export const register = (
  payload: Yup.TypeOf<typeof registerSchema>
): AxiosRes<ResRegister> => appAxios.post(`${path}/register`, payload);
