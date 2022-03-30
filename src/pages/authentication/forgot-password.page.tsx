import React, { useState } from 'react';

import { Page } from 'app/next';
import { AuthenticationApi } from 'api';
import toast from 'utils/toastr';
import { Input } from 'components/common/inputs';
import Button from 'components/common/Button';

const ForgotPasswordPage: Page = () => {
  const [email, setEmail] = useState<string>('kalat@kanime.fr');

  const handleClick = async () => {
    try {
      const response = await AuthenticationApi.forgotPassword(email);
      toast('Demande de nouveau mot de passe effectué', 'success');
    } catch (err) {
      console.log('Err', err);

      toast(err, 'error');
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-[80vh] bg-gray-50">
        <div className="max-w-md w-full bg-white border rounded shadow-lg p-6 space-y-2">
          <div className="mb-4">
            <h2 className="text-xl font-bold">Réinitialiser votre mot de passe</h2>
          </div>
          <div>
            <Input
              type="email"
              name="email"
              value={email}
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
    </>
  );
};

export default ForgotPasswordPage;
