import * as Yup from 'yup';

export const registerSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Votre pseudo doit contenir au moins 3 caractère')
    .required('Veuillez saisir un pseudo'),
  email: Yup.string()
    .email('Votre email est invalide')
    .required('Veuillez saisir un email'),
  password: Yup.string()
    .min(6, 'Votre mot de passe doit contenir au minimum 6 caractère')
    .required('Veuillez saisir un mot de passe'),
  confirmPassword: Yup.string()
    .required('Veuillez confirmer votre mot de passe')
    .oneOf([Yup.ref('password')], 'Les mot de passe ne correspondent pas'),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    // todo: fix it
    // .email('Veuillez saisir un email valide')
    .required('Veuillez saisir un email'),
  password: Yup.string()
    .required('Veuillez saisir un mot de passe')
    .min(6, 'Votre mot de passe contiens au moins 6 caractère'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Veuillez saisir un email valide')
    .required('Veuillez saisir un email'),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string()
    .min(6, 'Votre nouveau mot de passe doit contenir au minimum 6 caractère')
    .required('Veuillez saisir un mot de passe'),
  confirmPassword: Yup.string()
    .required('Veuillez confirmer votre mot de passe')
    .oneOf([Yup.ref('newPassword')], 'Les mot de passe ne correspondent pas'),
  token: Yup.string().required(),
});

export const createReactionSchema = Yup.object({
  userId: Yup.number().required('missing userId'),
  content: Yup.string().required('Veuillez saisir un message'),
  parentId: Yup.number(),
});