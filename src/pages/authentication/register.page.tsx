import React from 'react';
import { NextPage } from 'next';
import * as Yup from 'yup';
import Link from 'next/link';
import { Form, Formik } from 'formik';

import { registerSchema } from '@validations/users';
import { routes } from '@lib/constants';
import { Field } from '@components/common/formik';
import Button from '@components/common/Button';
import Layout from '@layouts/Layout';

type valuesTypes = Yup.TypeOf<typeof registerSchema>;

const initialValues: valuesTypes = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage: NextPage = () => {
  const handleSubmit = (values) => {
    console.log('Values', values);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-4">
            <div className="mb-4">
              <p className="text-gray-600">Connexion</p>
              <h2 className="text-xl font-bold">
                Rejoignez {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <div>
              <Field type="email" name="email" placeholder="adresse email" />
            </div>
            <div>
              <Field type="text" name="username" placeholder="nom d'utilisateur" />
            </div>
            <div>
              <Field type="password" name="password" placeholder="mot de passe" />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="confirmez vot mot de passe"
              />
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
              <div>
                <Link href={routes.authentication + '/forgot-password'}>
                  <a className="text-sm text-blue-600 hover:underline">
                    mot de passe oublié ?
                  </a>
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

export default RegisterPage;
