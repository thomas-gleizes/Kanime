import React from 'react';

import Header from './Header';
import Footer from './Footer';
import Title from '@layouts/Title';

interface Props {
  children: React.ReactNode;
  title: string;
}

const Layout: React.FunctionComponent<Props> = ({ children, title }) => {
  return (
    <>
      <Title>{title}</Title>
      <Header />
      <main className="py-14">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
