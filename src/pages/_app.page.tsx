import React, { useMemo } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';

import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import DialogContextProvider from 'context/dialog.context';

const ContextsProvider: Component<ContextProviderProps> = ({ children }) => (
  <ChakraProvider>
    <LayoutContextProvider>
      <DialogContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </DialogContextProvider>
    </LayoutContextProvider>
  </ChakraProvider>
);

const App = ({ Component, pageProps }: AppProps) => {
  const Layout: Component = useMemo(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ContextsProvider>
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
    </ContextsProvider>
  );
};

// export const getInitialProps = async (appContext: AppProps) => {
//   return {
//     props: await appContext.Component.getInitialProps(appContext),
//   };
// };

export default App;
