import React, { useEffect } from 'react';
import { NextPage } from 'next';

import { useLayoutContext } from '@context/layout.context';
import Layout from '@layouts/Layout';

const DevPage: NextPage = () => {
  const { header } = useLayoutContext();

  useEffect(() => {
    header.hideHeader();

    return () => header.showHeader();
  }, []);

  return (
    <Layout>
      <h1 className="text-center text-6xl">Test page</h1>
    </Layout>
  );
};

export default DevPage;
