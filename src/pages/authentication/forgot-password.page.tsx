import React from 'react';
import { NextPage } from 'next';

import Layout from '@layouts/Layout';
import Button from '@components/common/Button';

const ForgotPasswordPage: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <form className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Réinitialiser votre mot de passe</h2>
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="exemple@kanime.fr"
              required
            />
          </div>
          <div>
            <Button type="submit">Envoyez la demande</Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
