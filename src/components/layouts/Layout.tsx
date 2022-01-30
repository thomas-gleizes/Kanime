import React from 'react';

interface Props {
  children: JSX.Element | React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return <main className="mt-header">{children}</main>;
};

export default Layout;
