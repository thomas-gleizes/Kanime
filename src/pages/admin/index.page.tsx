import React from 'react';

import { Page } from 'app/next';
import { routes } from 'resources/routes';
import { ssrHandler } from 'services/handler.service';
import ListLogs from 'components/admin/ListLogs';
import AdminLayout from 'components/layouts/pages/AdminLayout';
import { useUserContext } from 'context/user.context';

export const getServerSideProps = ssrHandler(async ({ req }) => {
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
      props: {},
    };
  }
});

const AdminHomePage: Page = () => {
  const { user } = useUserContext();

  return (
    <>
      <h1>{user?.username}: You are an admin</h1>
      <div className="p-5">
        <ListLogs />
      </div>
    </>
  );
};

AdminHomePage.layout = AdminLayout;

export default AdminHomePage;
