import * as Yup from 'yup';

import { ApiService } from 'services/api.service';
import { routes } from 'ressources/routes';
import {
  registerSchema,
  resetPasswordSchema,
  signInSchema,
} from 'ressources/validations';

export const login = (payload: Yup.TypeOf<typeof signInSchema>) =>
  ApiService.post(routes.authentication.api.signIn, payload);

export const register = (payload: Yup.TypeOf<typeof registerSchema>): any =>
  ApiService.post(routes.authentication.api.register, payload);

export const forgotPassword = (email: string): any =>
  ApiService.patch(routes.authentication.api.forgotPassword, { email });

export const resetPassword = (values: Yup.TypeOf<typeof resetPasswordSchema>): any =>
  ApiService.patch(routes.authentication.api.resetPassword, values);
