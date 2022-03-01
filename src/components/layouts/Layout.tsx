import React from 'react';

interface Props {
  children: NodeR;
}

const Layout: Component<Props> = ({ children }) => {
  return <main className="mt-header">{children}</main>;
};

export default Layout;
