import React, { useMemo } from 'react'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import 'reflect-metadata'

import 'simplebar/dist/simplebar.min.css'
import 'react-toastify/dist/ReactToastify.css'

import 'styles/fonts.css'
import 'styles/globals.css'

import { AppProps } from 'app/next'
import { LayoutProps } from 'app/types'
import { SsrException } from 'exceptions'
import ContextsProvider from 'context'
import DefaultLayout from 'components/layouts/pages/DefaultLayout'

const MyApp = ({ Component, pageProps, session }: AppProps) => {
  const Layout = useMemo<Component<LayoutProps>>(
    () => Component.layout || DefaultLayout,
    [Component.layout]
  )

  const ssrException = useMemo<Undefinedable<SsrException>>(() => {
    if (pageProps.hasOwnProperty('error') && pageProps.error.name === 'SsrException') {
      const exception = new SsrException(pageProps.error.statusCode, pageProps.error.message)

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
      <Layout pageProps={pageProps} exception={ssrException}>
        <Component {...pageProps} />
      </Layout>
    </ContextsProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  console.log('AppProps', appProps)

  return appProps
}

export default MyApp
