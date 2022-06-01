import React from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import { Page } from 'next/app';
import { AuthenticationApi } from 'api';
import { ssrHandler } from 'services/handler.service';
import { resetPasswordSchema } from 'resources/validations';
import { UserModel } from 'models';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import { Field } from 'components/common/formik';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import Button from 'components/common/Button';

type resetPasswordPayload = Yup.TypeOf<typeof resetPasswordSchema>;

interface Props {
  token: string;
}

export const getServerSideProps = ssrHandler<Props, { token: string }>(
  async (context) => {
    const { token } = context.query;

    const user = await UserModel.checkResetPasswordToken(token as string);

    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: routes.authentication.signIn,
        },
      };
    } else
      return {
        props: { token: token as string },
      };
  }
);

const ResetPasswordPage: Page<Props> = ({ token }) => {
  const router = useRouter();

  const initialValues: resetPasswordPayload = {
    newPassword: 'azerty',
    confirmPassword: 'azerty',
    token: '',
  };

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
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default ResetPasswordPage;
