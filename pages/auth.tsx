import React from 'react';

import LoginForm from '@components/auth/LoginForm';
import RegisterForm from '@components/auth/RegisterForm';

const Auth = () => {
  return (
    <div className='grid sm:grid-cols-2 sm:mx-10 md:mx-20 my-10'>
      <div className='w-full px-4 sm:mx-10 my-10'>
        <LoginForm />
      </div>
      <div className='w-full px-4 sm:mx-10 my-10'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Auth;
