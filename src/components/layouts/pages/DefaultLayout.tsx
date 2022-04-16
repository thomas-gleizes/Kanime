import React from 'react';
import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';

interface Props {
  children: NodeR;
}

const DefaultLayout: Component<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="mt-header">{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
