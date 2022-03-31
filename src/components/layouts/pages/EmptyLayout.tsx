import React from 'react';

interface Props {
  children: NodeR;
}

const EmptyLayout: Component<Props> = ({ children }) => {
  return <main>{children}</main>;
};

export default EmptyLayout;
