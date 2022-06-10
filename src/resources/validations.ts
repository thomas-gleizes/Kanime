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
  rememberMe: Yup.boolean(),
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

export const editEntrySchema = (max: number) =>
  Yup.object({
    status: Yup.string(),
    progress: Yup.number()
      .min(0, 'La valeur doit étre positif')
      .max(max, `Le nombre d'épisode max est ${max}`),
    visibility: Yup.string(),
    rating: Yup.number()
      .min(0, 'La note minimal est 0.')
      .max(10, 'La note maximal est 10')
      .nullable(),
    note: Yup.string().max(1000, 'Nombre de caractère max atteint: 1000').nullable(),
    startedAt: Yup.string().nullable(),
    finishAt: Yup.string().nullable(),
  });

export const createPostSchema = Yup.object({
  userId: Yup.number().required('missing userId'),
  content: Yup.string().required('Veuillez saisir un message'),
  parentId: Yup.number(),
});
