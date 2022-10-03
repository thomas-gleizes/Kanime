import React, { useMemo, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
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
import Title from 'components/layouts/Title';
import Head from 'next/head';

const ContextsProvider: Component<ContextsProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LayoutContextProvider>
          <UserContextProvider>
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

const App = ({ Component, pageProps }: AppProps) => {
  const Layout = useMemo<Component>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ContextsProvider>
      <Head>
        <meta name='robots' content='noindex' />
        <title>Accueil | K'Anime</title>
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
