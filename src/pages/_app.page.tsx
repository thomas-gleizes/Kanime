import React, { useMemo } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import {
  AlertDialog,
  ConfirmDialog,
  PromptDialog,
  CustomDialog,
} from 'components/dialog';

import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

const ContextsProvider: Component<ContextProviderProps> = ({ children }) => (
  <LayoutContextProvider>
    <UserContextProvider>{children}</UserContextProvider>
  </LayoutContextProvider>
);

const Dialogs: Component<ContextProviderProps> = ({ children }) => (
  <>
    {children}
    <ConfirmDialog />
    <PromptDialog />
    <AlertDialog />
    <CustomDialog />
  </>
);

const App = ({ Component, pageProps }: AppProps) => {
  const Layout: Component = useMemo(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ChakraProvider>
      <ContextsProvider>
        <Dialogs>
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
        </Dialogs>
      </ContextsProvider>
    </ChakraProvider>
  );
};

export default App;
