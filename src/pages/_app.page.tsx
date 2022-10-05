import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import 'reflect-metadata';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import DialogContextProvider from 'context/dialog.context';

import 'styles/fonts.css';
import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';

const ContextsProvider: Component<ContextsProviderProps> = ({ children, initialState }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LayoutContextProvider>
          <UserContextProvider initialUser={initialState.user}>
            <DialogContextProvider>
              {children}
              <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                pauseOnHover
              />
            </DialogContextProvider>
          </UserContextProvider>
        </LayoutContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const App = ({ Component, pageProps, session }: AppProps) => {
  console.log('session app', session?.user.username);

  const Layout = useMemo<Component>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ContextsProvider initialState={{ user: session?.user }}>
      <Head>
        <meta name='robots' content='noindex' />
        <title>Accueil | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </ContextsProvider>
  );
};

export default App;
