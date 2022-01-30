import { NextComponentType, NextPageContext } from 'next';
import React from 'react';
import Head from 'next/head';

import '../styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

import LayoutContextProvider from '@context/layout';
import UserContextProvider from '@context/user';
import Header from '@layouts/Header';
import Footer from '@layouts/Footer';
import EmptyLayout from '@layouts/EmptyLayout';
import { AlertDialog, ConfirmDialog, PromptDialog } from '@components/dialog';

type AppProps = {
  pageProps: any;
  Component: NextComponentType<NextPageContext, any, {}> & { Layout?: any };
};

const AllContextProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <LayoutContextProvider>
    <UserContextProvider>{children}</UserContextProvider>
  </LayoutContextProvider>
);

const AllDialog: React.FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => (
  <>
    {children}
    <ConfirmDialog />
    <PromptDialog />
    <AlertDialog />
  </>
);

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = Component.Layout || EmptyLayout;

  return (
    <AllContextProvider>
      <AllDialog>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        </Head>
        <Header />
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
        <Footer />
      </AllDialog>
    </AllContextProvider>
  );
};

export default App;
