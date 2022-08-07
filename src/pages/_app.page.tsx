import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import DialogContextProvider from 'context/dialog.context';

import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';

const ContextsProvider: Component<ContextProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LayoutContextProvider>
          <UserContextProvider>
            <DialogContextProvider>{children}</DialogContextProvider>
          </UserContextProvider>
        </LayoutContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = useMemo<Component>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ContextsProvider>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
        <link href="/fonts/asap/Asap-VariableFont_wght.ttf" rel="preload" as="font" />
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
