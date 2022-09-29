import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Page } from 'next/app';
import { authenticationApi } from 'api';
import { ssrHandler } from 'services/handler.service';
import { routes } from 'resources/routes';
import { Input } from 'components/common/inputs';
import Button from 'components/common/Button';

export const getServerSideProps = ssrHandler<{}>(async (context) => {
  if (context.req.session.user)
    return {
      redirect: {
        permanent: false,
        destination: routes.users.page(context.req.session.user.slug),
      },
    };

  return { props: {} };
});

const ForgotPasswordPage: Page = () => {
  const [email, setEmail] = useState<string>('kalat@kanime.fr');

  const handleClick = async () => {
    try {
      await authenticationApi.forgotPassword(email);
      toast.success('Demande de nouveau mot de passe effectué');
    } catch (err) {
      toast.error(err);
    }
  };

  return (
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
  );
};

export default ForgotPasswordPage;
