import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import Content from '@layouts/Content';
import EditGeneralData from '@components/user/EditGeneralData';

interface Props {}

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  ({ req, query }) => {
    if (req.session.user.login !== query.login) {
      return {
        redirect: {
          permanent: false,
          destination: `${routes.users}/${query.login}`,
        },
      };
    }

    return { props: {} };
  }
);

const SettingsPage: NextPage<Props> = () => {
  return (
    <Content>
      <EditGeneralData />
    </Content>
  );
};

export default SettingsPage;
