import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { User } from '@types';
import { withSessionSsr } from '@lib/session';
import Content from '@layouts/Content';

interface Props {
  user?: User;
}

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  async ({ req, res }) => {
    const user: User = req.session.user;

    if (!user || !user.isAdmin) {
      return {
        redirect: {
          permanent: false,
          destination: '/'
        }
      };
    } else {
      return {
        props: { user: user }
      };
    }
  }
);

const Admin: NextPage<Props> = ({ user }) => {
  return (
    <Content>
      <h1>{user?.login}: You are an admin</h1>
    </Content>
  );
};

export default Admin;
