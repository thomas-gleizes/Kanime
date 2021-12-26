import type { AppProps } from 'next/app';
import React from 'react';

import '../styles/globals.css';

import Layout from '@components/layouts';
import UserContextProvider from '@context/user';

const AllContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AllContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AllContextProvider>
  );
};

export default App;
