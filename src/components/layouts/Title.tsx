import React from 'react';
import Head from 'next/head';

interface Props {
  children: string;
}

const Title: Component<Props> = ({ children }) => {

  const title = `${children} | ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default Title;
