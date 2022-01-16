import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import Content from '@layouts/Content';

interface Props {}

export const getServerSideProps: GetServerSideProps<Props> = withSessionSsr(
  ({ req, query }) => {
    if (+req.session.user.id != +query.id) {
      return {
        redirect: {
          permanent: false,
          destination: `${routes.users}/${query.id}`,
        },
      };
    }

    return { props: {} };
  }
);

const SettingsPage: NextPage<Props> = () => {
  return (
    <Content>
      <h1 className="text-center text-3xl">Settings</h1>
    </Content>
  );
};

export default SettingsPage;
