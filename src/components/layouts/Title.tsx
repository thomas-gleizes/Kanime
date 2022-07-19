import React from 'react';
import Head from 'next/head';

interface Props {
  children: string | ReactNode;
}

const Title: Component<Props> = ({ children }) => {
  return (
    <Head>
      <title>
        {children} | {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
    </Head>
  );
};

export default Title;
