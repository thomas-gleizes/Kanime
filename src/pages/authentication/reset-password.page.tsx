import React from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Page, ServerSideProps } from 'app/next';
import { AuthenticationApi } from 'api';
import { UserModel } from 'models';
import { resetPasswordSchema } from 'ressources/validations';
import { routes } from 'ressources/routes';
import toast from 'utils/toastr';
import { Field } from 'components/common/formik';
import Layout from 'components/layouts/Layout';
import Button from 'components/common/Button';

interface Props {
  token: string;
}

type resetPasswordPayload = Yup.TypeOf<typeof resetPasswordSchema>;

const initialValues: resetPasswordPayload = {
  newPassword: 'azerty',
  confirmPassword: 'azerty',
  token: '',
};

export const getServerSideProps: ServerSideProps<any> = async (context) => {
  const { token } = context.query;

  const user = await UserModel.checkResetPasswordToken(token as string);
  if (!user)
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: routes.authentication.signIn,
      },
    };

  return { props: { token } };
};

const ResetPasswordPage: Page<Props> = ({ token }) => {
  const router = useRouter();

  const handleSubmit = async (values: resetPasswordPayload) => {
    try {
      await AuthenticationApi.resetPassword(values);

      toast('Votre mot de passe a bien été changé', 'success');
      await router.push(routes.authentication.signIn);
    } catch (err) {
      toast(err.error, 'error');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Formik
          initialValues={{ ...initialValues, token }}
          onSubmit={handleSubmit}
          validationSchema={resetPasswordSchema}
        >
          <Form className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-2">
            <div className="mb-4">
              <h2 className="text-xl font-bold">Réinitialiser votre mot de passe</h2>
            </div>
            <div>
              <Field
                type="password"
                name="newPassword"
                label="Nouveau mot de passe"
                required
              />
            </div>
            <div>
              <Field
                type="password"
                name="confirmPassword"
                label="Confirmer mot de passe"
                required
              />
            </div>
            <div>
              <Button type="submit">Confirmer</Button>
            </div>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

export default ResetPasswordPage;
