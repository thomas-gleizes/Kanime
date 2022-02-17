import React, { useState } from 'react';
import { NextPage } from 'next';

import { AuthenticationApi } from '@api';
import Layout from '@layouts/Layout';
import Button from '@components/common/Button';
import { Input } from '@components/common/inputs';
import toast from '@helpers/toastr';

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');

  const handleClick = async () => {
    try {
      const response = await AuthenticationApi.forgotPassword(email);
      toast('Demande de nouveau mot de passe effectué', 'success');
    } catch (err) {
      toast(err.error, 'error');
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Réinitialiser votre mot de passe</h2>
          </div>
          <div>
            <Input
              type="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="exemple@kanime.fr"
              required
            />
          </div>
          <div>
            <Button onClick={handleClick}>Envoyez la demande</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPasswordPage;
