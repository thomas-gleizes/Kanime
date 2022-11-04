import React, { useMemo, useState } from 'react'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'
import App, { AppContext } from 'next/app'
import 'reflect-metadata'

import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css'

import 'styles/fonts.css'
import 'styles/globals.css'

import { AppProps } from 'app/next'
import { LayoutProps } from 'app/types'
import { SsrException } from 'exceptions'
import LayoutContextProvider from 'context/layout.context'
import AuthContextProvider from 'context/auth.context'
import DefaultLayout from 'components/layouts/pages/DefaultLayout'
import DialogContextProvider from 'context/dialog.context'
import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'

const ContextsProvider: Component<ContextsProviderProps> = ({
  children,
  initialState
}) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <LayoutContextProvider>
          <AuthContextProvider initialUser={initialState.user}>
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
          </AuthContextProvider>
        </LayoutContextProvider>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

const MyApp = ({ Component, pageProps, session }: AppProps) => {
  const Layout = useMemo<Component<LayoutProps>>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  )

  const ssrException = useMemo<Undefinedable<SsrException>>(() => {
    if (pageProps.hasOwnProperty('error') && pageProps.error.name === 'SsrException') {
      const exception = new SsrException(
        pageProps.error.statusCode,
        pageProps.error.message
      )

      delete pageProps.errror

      return exception
    }
  }, [pageProps])

  return (
    <ContextsProvider initialState={{ user: session?.user }}>
      <Head>
        <meta name="robots" content="noindex" />
        <title>Accueil | {process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />
      <Layout pageProps={pageProps} exception={ssrException}>
        <Component {...pageProps} />
      </Layout>
      <Footer />
    </ContextsProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  console.log('AppProps', appProps)

  return appProps
}

export default MyApp
