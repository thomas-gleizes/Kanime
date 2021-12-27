import React from 'react';
import Head from 'next/head';

interface Props {
  title: string;
}

const Title = ({ children }) => {
  return (
    <Head>
      <title>
        {children} | {process.env.NEXT_PUBLIC_APP_NAME}
      </title>
    </Head>
  );
};

export default Title;
