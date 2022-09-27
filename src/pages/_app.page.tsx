import React, { useMemo, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

import { AppProps } from 'next/app';
import LayoutContextProvider from 'context/layout.context';
import UserContextProvider from 'context/user.context';
import DefaultLayout from 'components/layouts/pages/DefaultLayout';
import DialogContextProvider from 'context/dialog.context';

import 'styles/fonts.css';
import 'styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import 'react-toastify/dist/ReactToastify.css';

import { getSession } from 'services/session.service';
import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';
import Title from 'components/layouts/Title';

const ContextsProvider: Component<ContextsProviderProps> = ({ children, values }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LayoutContextProvider>
          <UserContextProvider initialUser={values.user}>
            <DialogContextProvider>
              {children}
              <ToastContainer
                position="top-right"
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

const App = ({ Component, pageProps, initialState }: AppProps) => {
  const Layout = useMemo<Component>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  );

  return (
    <ContextsProvider values={initialState}>
      <Title>Accueil</Title>
      <Header />
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </ContextsProvider>
  );
};

App.getInitialProps = async (context) => {
  const session = await getSession(context.ctx.req, context.ctx.res);

  return { initialState: { user: session.user } };
};

export default App;
