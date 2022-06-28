import React from 'react';
import Header from 'components/layouts/Header';
import Footer from 'components/layouts/Footer';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: NodeR;
}

const DefaultLayout: Component<Props> = ({ children, ...props }) => {
  return (
    <>
      <Header />
      <main {...props}> {children}</main>
      <Footer />
    </>
  );
};

DefaultLayout.defaultProps = {
  className: 'mt-header',
};

export default DefaultLayout;
