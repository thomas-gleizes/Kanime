import React from "react";
import Error from "next/error";

import AnimeProps from "../../helpers/interfaces/anime";
import { ApiError, Saga as SagaProps } from "../../helpers/interfaces/global";
import { SagaApi } from "../../api";
import Layout from "../../components/layouts/Layout";
import Anime from "../../components/common/Anime";

interface Props {
  error?: ApiError;
  animes?: Array<AnimeProps>;
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
  if (error) return <Error statusCode={error.status} />;

  return (
    <Layout>
      <div className="mt-9">
        <h2 className="text-xl text-center my-2">{saga.libelle}</h2>
      </div>
      <div className="flex justify-center my-10">
        {animes.map((anime, index) => (
          <div className="mx-4" key={index}>
            <Anime anime={anime} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Saga;
