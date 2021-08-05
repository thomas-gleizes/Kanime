import Head from "next/head";

import Layout from "../../../components/layouts/Layout";

const Settings = ({ username }) => {
  return (
    <>
      <Head>
        <title> Settings | {process.env.NEXT_PUBLIC_SITE_NAME} </title>
      </Head>
      <Layout className="text-center py-4">Settings | {username}</Layout>
    </>
  );
};

export default Settings;

export const getServerSideProps = ({ query }) => {
  return { props: { ...query } };
};
