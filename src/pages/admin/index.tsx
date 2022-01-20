import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { User } from '@types';
import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import Content from '@layouts/Content';
import ListLogs from '@components/admin/ListLogs';

interface Props {
  user?: User;
}

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  async ({ req }) => {
    const user: User = req.session.user;

    if (!user || !user.isAdmin) {
      return {
        redirect: {
          permanent: false,
          destination: routes.home,
        },
      };
    } else {
      return {
        props: { user: user },
      };
    }
  }
);

const Admin: NextPage<Props> = ({ user }) => {
  return (
    <Content>
      <h1>{user?.login}: You are an admin</h1>
      <div className="w-1000">
        <ListLogs />
      </div>
    </Content>
  );
};

export default Admin;
