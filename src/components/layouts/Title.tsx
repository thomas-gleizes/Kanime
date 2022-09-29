import React from 'react';
import Head from 'next/head';

interface Props {
  children: string | ReactNode;
}

const Title: Component<Props> = ({ children }) => {
  return (
    <Head>
      <title>{children}</title>
    </Head>
  );
};

export default Title;
