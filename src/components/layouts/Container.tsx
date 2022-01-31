import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Container: React.FunctionComponent<Props> = ({ children }) => {
  return <div className="px-2 py-4">{children}</div>;
};

export default Container;
