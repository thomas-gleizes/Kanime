import * as Yup from 'yup';

import appAxios from '@lib/axios/appAxios';
import { AxiosRes, ResRegister } from '@types';
import { signInSchema, registerSchema } from '@validations/users';
import { routes } from '@lib/constants';

export const login = (payload: Yup.TypeOf<typeof signInSchema>): AxiosRes<any> =>
  appAxios.post(routes.authentication.api.signIn, payload);

export const register = (
  payload: Yup.TypeOf<typeof registerSchema>
): AxiosRes<ResRegister> => appAxios.post(routes.authentication.api.register, payload);
