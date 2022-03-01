import React, { useMemo } from 'react';
import Head from 'next/head';

import { AppProps } from 'next/app';

import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';
import { AlertDialog, ConfirmDialog, PromptDialog } from 'components/dialog';

import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

const AllContextProvider: Component<ContextProviderProps> = ({ children }) => (
  <LayoutContextProvider>
    <UserContextProvider>{children}</UserContextProvider>
  </LayoutContextProvider>
);

const AllDialog: Component<ContextProviderProps> = ({ children }) => (
  <>
    {children}
    <ConfirmDialog />
    <PromptDialog />
    <AlertDialog />
  </>
);

const App = ({ Component, pageProps }: AppProps) => {
  const Layout: Component = useMemo(() => Component.layout || Layout, [Component.layout]);

  return (
    <AllContextProvider>
      <AllDialog>
        <Head>
          <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
          <link
            href="/fonts/asap/Asap-VariableFont_wght.ttf"
            crossOrigin=""
            rel="preload"
            as="font"
          />
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
