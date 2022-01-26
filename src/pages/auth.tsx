import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { useUserContext } from '@context/user';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import Content from '@layouts/Content';
import Title from '@layouts/Title';

const Auth: NextPage = () => {
  const { isLogin, user } = useUserContext();

  const router = useRouter();

  useEffect(() => {
    if (isLogin) router.push(`users/${user.login}`);
  }, [isLogin]);

  return (
    <Content>
      <Title>Authentification</Title>
      <div className="grid sm:grid-cols-2 sm:mx-10 md:mx-20 my-10">
        <div className="w-full px-4 sm:mx-10 my-10">
          <LoginForm />
        </div>
        <div className="w-full px-4 sm:mx-10 my-10">
          <RegisterForm />
        </div>
      </div>
    </Content>
  );
};

export default Auth;
