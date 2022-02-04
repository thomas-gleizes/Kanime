import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { useUserContext } from '@context/user.context';
import { routes } from '@lib/constants';
import { registerSchema } from '@validations/users';
import { AuthenticationApi } from '@api';
import { Field } from '@components/common/formik';
import Button from '@components/common/Button';
import Layout from '@layouts/Layout';

type registerPayload = Yup.TypeOf<typeof registerSchema>;

const initialValues: registerPayload = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage: NextPage = () => {
  const { signIn } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (values) => {
    try {
      const {
        data: { user, token },
      } = await AuthenticationApi.register(values);

      signIn(user, token);

      await router.push(`${routes.users}/${user.username}`);
    } catch (e) {}
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={registerSchema}
        >
          <Form className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-3">
            <div className="mb-4">
              <p className="text-gray-600">Connexion</p>
              <h2 className="text-xl font-bold">
                Rejoignez {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <div>
              <div>
                <Field
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="exemple@kanime.fr"
                  required
                />
              </div>
              <div>
                <Field
                  type="text"
                  name="username"
                  label="Nom d'utilisateur"
                  placeholder="john_doe"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  label="Mot de passe"
                  placeholder="password"
                  required
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="confirmPassword"
                  label="Confirmez votre mot de passe"
                  placeholder="password"
                  required
                />
              </div>
            </div>
            <div>
              <Button type="submit">Connexion</Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-row items-center">
                <input
                  type="checkbox"
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <label
                  htmlFor="comments"
                  className="ml-2 text-sm font-normal text-gray-600"
                >
                  Se souvenir de moi
                </label>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

export default RegisterPage;
