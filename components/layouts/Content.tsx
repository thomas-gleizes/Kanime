import React from 'react';

interface Props {
  children: React.ReactNode;
}

const Content: React.FunctionComponent = ({ children }) => {
  return <div className='px-2 py-4'>
    {children}
  </div>;
};

export default Content;