import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Footer from './Footer';
import { ConfirmDialog, PromptDialog, AlertDialog } from '@components/dialog';

interface Props {
  children: React.ReactNode;
}

const AllDialog: React.FunctionComponent = () => {
  return (
    <>
      <ConfirmDialog />
      <PromptDialog />
      <AlertDialog />
    </>
  );
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <Header />
      <main className="py-[56px]">{children}</main>
      <Footer />
      <AllDialog />
    </>
  );
};

export default Layout;
