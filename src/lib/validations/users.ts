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
    .oneOf([Yup.ref('password')], 'Les mot de passe correspondent pas'),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email('Veuillez saisir un email valide')
    .required('Veuillez saisir un email'),
  password: Yup.string()
    .required('Veuillez saisir un mot de passe')
    .min(6, 'Votre mot de passe contiens au moins 6 caractère'),
});
