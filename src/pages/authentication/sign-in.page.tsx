import React from 'react';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';

import { Page } from 'app/next';
import { AuthenticationApi } from 'api';
import { useUserContext } from 'context/user.context';
import { signInSchema } from 'ressources/validations';
import { routes } from 'ressources/routes';
import toast from 'utils/toastr';
import { Field } from 'components/common/formik';
import Layout from 'components/layouts/Layout';
import Button from 'components/common/Button';

type loginType = Yup.TypeOf<typeof signInSchema>;

const initialValues: loginType = {
  email: '',
  password: '',
};

const SignInPage: Page = () => {
  const { signIn } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (values: loginType) => {
    try {
      const {
        data: { user, token },
      } = await AuthenticationApi.login(values);

      if (!user || !token) window.location.reload();
      else {
        signIn(user, token);
        await router.push(routes.users.page(user.username));
      }
    } catch (e) {
      console.log('E', e);

      toast(e.error, 'error');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={signInSchema}
        >
          <Form className="max-w-md w-full bg-white border rounded shadow-lg p-6">
            <div className="mb-4">
              <p className="text-gray-600">Connexion</p>
              <h2 className="text-xl font-bold">
                Rejoignez {process.env.NEXT_PUBLIC_APP_NAME}
              </h2>
            </div>
            <div>
              <Field
                type="email"
                name="email"
                label="Email"
                placeholder="exemple@kanime.fr"
                required
                invalid={false}
                valid={false}
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
                <Link href={routes.authentication.forgotPassword}>
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

export default SignInPage;
