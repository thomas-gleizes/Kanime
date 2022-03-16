import React from 'react';

import { Page, ServerSideProps } from 'app/next';
import { withSessionSsr } from 'services/session.service';
import { routes } from 'resources/routes';
import ListLogs from 'components/admin/ListLogs';

interface Props {
  user?: User;
}

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
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
        props: { user },
      };
    }
  }
);

const Admin: Page<Props> = ({ user }) => {
  return (
    <>
      <h1>{user?.username}: You are an admin</h1>
      <div className="w-1000">
        <ListLogs />
      </div>
    </>
  );
};

export default Admin;
