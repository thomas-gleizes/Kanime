import React from 'react';
import Layout from '@layouts/Layout';
import { Input } from '@components/common/inputs';
import Button from '@components/common/Button';
import { Form, Formik } from 'formik';
import { GetServerSideProps, NextPage } from 'next';
import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import { Field } from '@components/common/formik';

interface Props {
  token: string;
}

const initialValues = {
  newPassword: '',
  confirmPassword: '',
};

export const getServerSideProps = (context) => {
  const { token } = context.query;

  return { props: { token: token } };
};

const ResetPasswordPage: NextPage<Props> = ({ token }) => {
  return (
    <Layout>
      {token}
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <Formik initialValues={initialValues} onSubmit={console.log}>
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
