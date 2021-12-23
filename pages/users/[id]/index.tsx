import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { User } from '@types';
import { withSessionSsr } from '@lib/session';
import Content from '@components/layouts/Content';
import appAxios from '@lib/api/appAxios';
import { ApiError } from '@errors';

interface Props {
  user: User;
  isCurrent: boolean;
  error?: ApiError;
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async ({ query, req }) => {
    const { id } = query;
    const { user: sessionUser } = req.session;
    let props: Props;

    try {
      const { data } = await appAxios.get(`users/${id}`);

      props = {
        user: data.user,
        isCurrent: data.user?.id === sessionUser.id,
      };
    } catch (e) {}

    return {
      props,
    };
  }
);

export const Home: NextPage<Props | Error> = ({ user, isCurrent, error }) => {
  return (
    <Content>
      <div>{JSON.stringify(user)}</div>
      <div>{isCurrent ? 'current' : 'none'}</div>
    </Content>
  );
};

export default Home;
