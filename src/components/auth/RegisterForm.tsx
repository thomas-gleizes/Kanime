import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import appAxios from '../../lib/api/appAxios';
import Field from '../common/field';

const validationSchema = Yup.object({
  login: Yup.string()
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

type registerForm = Yup.TypeOf<typeof validationSchema>;

const initialValues: registerForm = {
  login: 'Kalat',
  email: 'kalat@kanime.fr',
  password: 'azerty',
  confirmPassword: 'azerty',
};

const RegisterForm: React.FunctionComponent = () => {
  const handleSubmit = async (
    values: registerForm,
    formik: FormikHelpers<registerForm>
  ) => {
    try {
      const response = await appAxios.post('auth/register', values);
    } catch (e) {}
  };

  return (
    <div className="bg-gray-50 border px-3 sm:px-10 py-10 shadow-xl rounded">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold">
                Inscrivez-vous sur {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <div className="flex flex-col my-3">
              <Field type="email" label="Email" name="email" required />
            </div>
            <div className="flex flex-col my-3">
              <Field label="Pseudo" type="text" name="login" required />
            </div>
            <div className="flex flex-col my-3">
              <Field label="Mot de passe" type="password" name="password" required />
            </div>
            <div className="flex flex-col my-3">
              <Field
                label="Confirmer le mot de passe"
                type="password"
                name="confirmPassword"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-700 text-white text-xl px-10 py-2 rounded shadow hover:shadow-xl cursor-pointer transition transform duration-100 hover:scale-105"
            >
              Connexion
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterForm;
