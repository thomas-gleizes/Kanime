import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { withIronSessionSsr } from 'iron-session/next';

import { sessionOptions } from '@lib/session';
import { User } from '@types';

interface Props {
  user: User;
}

export const getServerSideProps: GetServerSideProps<Props> = withIronSessionSsr(
  async ({ req, res }) => {
    const user: User = req.session.user;

    return {
      props: { user },
    };
  },
  sessionOptions
);

const Admin: NextPage<Props> = ({ user }) => {
  return (
    <>
      <h1>{user.login}: You are an admin</h1>
    </>
  );
};

export default Admin;
