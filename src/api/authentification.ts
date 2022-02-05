import * as Yup from 'yup';

import appAxios from '@lib/axios/appAxios';
import { AxiosRes, ResRegister } from '@types';
import { loginSchema, registerSchema } from '@validations/users';

export const login = (payload: Yup.TypeOf<typeof loginSchema>): AxiosRes<any> =>
  appAxios.post('authentication/sign-in', payload);

export const register = (
  payload: Yup.TypeOf<typeof registerSchema>
): AxiosRes<ResRegister> => appAxios.post(`authentication/register`, payload);
