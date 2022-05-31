import React, { useMemo } from 'react';
import Head from 'next/head';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import { AlertDialog, ConfirmDialog, PromptDialog } from 'components/dialog';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';

import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

import 'primereact/resources/themes/tailwind-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
  const Layout: Component = useMemo(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

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
        <Layout {...pageProps}>
          <Component {...pageProps} />
        </Layout>
      </AllDialog>
    </AllContextProvider>
  );
};

export default App;
