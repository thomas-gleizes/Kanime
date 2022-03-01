import React from 'react';

import type { Page, ServerSideProps } from 'next/app';
import { withSessionSsr } from 'services/session.service';
import { routes } from 'ressources/routes';
import EditGeneralData from 'components/user/EditGeneralData';

interface Props {}

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
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

const SettingsPage: Page<Props> = () => {
  return <EditGeneralData />;
};

export default SettingsPage;
