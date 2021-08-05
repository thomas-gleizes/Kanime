import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../styles/globals.css";

import UserContextProvider from "../context/user";
import LoaderContextProvider from "../context/loader";
import Header from "../components/layouts/Header";
import { ContextProps } from "../helpers/interfaces/global";

const AllContextProvider: React.FC<ContextProps> = ({ children }) => {
  return (
    <UserContextProvider>
      <LoaderContextProvider>{children}</LoaderContextProvider>
    </UserContextProvider>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Asap&display=swap"
          rel="stylesheet"
        />
      </Head>
      <AllContextProvider>
        <>
          <Header />
          <Component {...pageProps} />
        </>
      </AllContextProvider>
    </>
  );
};

export default MyApp;
