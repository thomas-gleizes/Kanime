import * as Yup from 'yup';

import appAxios from '@lib/axios/appAxios';
import { AxiosRes, ResRegister } from '@types';
import { registerSchema, resetPasswordSchema, signInSchema } from '@validations/users';
import { routes } from '@lib/constants';

export const login = (payload: Yup.TypeOf<typeof signInSchema>): AxiosRes<any> =>
  appAxios.post(routes.authentication.api.signIn, payload);

export const register = (
  payload: Yup.TypeOf<typeof registerSchema>
): AxiosRes<ResRegister> => appAxios.post(routes.authentication.api.register, payload);

export const forgotPassword = (email: string): AxiosRes<any> =>
  appAxios.patch(routes.authentication.api.forgotPassword, { email });

export const resetPassword = (
  values: Yup.TypeOf<typeof resetPasswordSchema>
): AxiosRes<any> => appAxios.patch(routes.authentication.api.resetPassword, values);
