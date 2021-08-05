import React from "react";
import Error from "next/error";

import { SagaApi } from "../../api";
import { ApiError, Saga as SagaProps } from "../../helpers/interfaces/global";
import Anime from "../../helpers/interfaces/anime";
import Layout from "../../components/layouts/Layout";
import { useLog } from "../../helpers/hooks";

interface Props {
  error?: ApiError;
  animes?: Array<Anime>;
  saga?: SagaProps;
}

export const getServerSideProps = async ({ query }) => {
  const { slug } = query;

  let props: Props = {};
  try {
    const { data } = await SagaApi.findBySlug(slug);
    const { saga, animes } = data;
    props = { saga, animes };
  } catch (error) {
    console.log(error);
    props.error = error;
  }

  return { props };
};

const Saga: React.FC<Props> = ({ error, saga, animes }) => {
  useLog("saga", saga, animes);
  if (error) return <Error statusCode={error.status} />;

  return (
    <Layout>
      <div>
        <h2>{saga.libelle}</h2>
      </div>
    </Layout>
  );
};

export default Saga;
