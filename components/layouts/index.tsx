import React from 'react';

import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='py-14'>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
