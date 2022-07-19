import React from 'react';

interface Props {
  children: ReactNode;
}

const EmptyLayout: Component<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default EmptyLayout;
