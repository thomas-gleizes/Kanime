import React from 'react';

import type { Page } from 'next/app';
import { routes } from 'resources/routes';
import EditGeneralData from 'components/user/EditGeneralData';
import { ssrHandler } from 'services/handler.service';

interface Props {}

export const getServerSideProps = ssrHandler<Props, { username: string }>(
  ({ req, query }) => {
    if (req.session.user.slug !== query.slug) {
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
  return (
    <div className="p-10">
      <EditGeneralData />
    </div>
  );
};

export default SettingsPage;
