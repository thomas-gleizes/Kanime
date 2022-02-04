import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { routes } from '@lib/constants';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import Button from '@components/common/Button';
import { loginSchema } from '@validations/users';
import { useUserContext } from '@context/user';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import Layout from '@layouts/Layout';

type loginType = Yup.TypeOf<typeof loginSchema>;

const initialValues: loginType = {
  email: 'kalat@kanime.fr',
  password: 'azerty',
};

const SignInPage: NextPage = () => {
  const { signIn } = useUserContext();
  const router = useRouter();

  const handleSubmit = async (values: loginType) => {
    try {
      const {
        data: { user, token },
      } = await appAxios.post(`${routes.authentication}/sign-in`, values);

      signIn(user, token);

      await router.push(`${routes.users}/${user.username}`);
    } catch (e) {
      console.log('E', e);

      toast(e.error, 'error');
    }
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
              <Field
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-sky-500"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div>
              <Field
                className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-sky-500"
                type="password"
                name="password"
                placeholder="Password"
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

export default SignInPage;
