import type { AppProps } from 'next/app';
import React from 'react';

import '../styles/globals.css';

import Layout from '@components/layouts';
import LayoutContextProvider from '@context/layout';
import UserContextProvider from '@context/user';

const AllContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <LayoutContextProvider>
      <UserContextProvider>{children}</UserContextProvider>
    </LayoutContextProvider>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AllContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AllContextProvider>
    </>
  );
};

export default App;
