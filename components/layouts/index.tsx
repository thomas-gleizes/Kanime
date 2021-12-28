import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />
      <main className="py-14">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
