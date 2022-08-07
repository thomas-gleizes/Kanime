import React from 'react';
import Footer from 'components/layouts/Footer';
import Header from 'components/layouts/Header';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const DefaultLayout: Component<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="bg-primary-dark"> {children}</main>
      <Footer />
    </>
  );
};

DefaultLayout.defaultProps = {
  className: 'mt-header',
};

export default DefaultLayout;
