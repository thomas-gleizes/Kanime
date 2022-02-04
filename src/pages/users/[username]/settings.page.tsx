import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import Layout from '@layouts/Layout';
import EditGeneralData from '@components/user/EditGeneralData';

interface Props {}

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  ({ req, query }) => {
    if (req.session.user.username !== query.username) {
      return {
        redirect: {
          permanent: false,
          destination: `${routes.users}/${query.username}`,
        },
      };
    }

    return { props: {} };
  }
);

const SettingsPage: NextPage<Props> = () => {
  return (
    <Layout>
      <EditGeneralData />
    </Layout>
  );
};

export default SettingsPage;
