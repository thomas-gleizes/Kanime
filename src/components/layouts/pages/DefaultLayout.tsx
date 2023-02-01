import React from 'react'

import { LayoutProps } from 'app/types'
import ErrorBoundary from 'components/layouts/errors/ErrorBoundary'
import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'

interface Props extends Omit<LayoutProps, 'pageProps'> {}

const DefaultLayout: Component<Props> = ({ children, exception }) => {
  return (
    <>
      <Header />
      <ErrorBoundary exception={exception}>
        <main className="dark:bg-gray-800">{children}</main>
      </ErrorBoundary>
      <Footer />
    </>
  )
}

export default DefaultLayout
