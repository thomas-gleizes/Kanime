import type { AppProps } from 'next/app';
import React from 'react';

import '../styles/globals.css';

import UserContextProvider from '@context/user';
import Layout from '@components/layouts';

const AllContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <AllContextProvider>
        <Layout title="">
          <Component {...pageProps} />
        </Layout>
      </AllContextProvider>
    </>
  );
};

export default App;
