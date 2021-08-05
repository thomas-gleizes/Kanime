import React from "react";
import { GetStaticProps } from "next";
import Head from "next/head";

import { AnimeApi } from "../../../api";
import { explore } from "../../../ressources/routes";
import { ApiError } from "../../../helpers/interfaces/global";
import AnimeProps from "../../../helpers/interfaces/anime";
import Layout from "../../../components/layouts/Layout";
import SliderAnime from "../../../components/common/SliderAnime";

interface Prop {
  animes: Array<AnimeProps>;
  error: ApiError;
}

interface Props {
  rated: Prop;
  popular: Prop;
  season: Prop;
}

export const getStaticProps: GetStaticProps = async () => {
  const props: object = {};
  const promises: object = {
    rated: AnimeApi.mostRated({ limit: 100 }),
    popular: AnimeApi.mostPopular({ limit: 100 }),
    season: AnimeApi.thisSeason(),
  };

  const keys = Object.keys(promises);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    try {
      const { data } = await promises[key];
      props[key] = {
        ...data,
      };
    } catch (error) {
      props[key] = {
        error,
      };
    }
  }

  return { props, revalidate: 60 };
};

const ExploreAnimes: React.FC<Props> = ({ rated, popular, season }) => {
  return (
    <Layout className="p-5">
      <Head>
        <title> Explore | {process.env.NEXT_PUBLIC_SITE_NAME} </title>
      </Head>
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <SliderAnime
            title="Les meilleurs notes"
            animes={rated.animes}
            link={explore.animes.rated}
            ranking="rating"
          />
          <SliderAnime
            title="Les plus populaire"
            animes={popular.animes}
            link={explore.animes.popular}
            ranking="popularity"
          />
          <SliderAnime
            title="Cette saison"
            animes={season.animes}
            link={explore.animes.currentSeason}
          />
        </div>
        <div className="side h-screen px-5">
          <div className="h-full border bg-gray-50 shadow rounded" />
        </div>
      </div>
    </Layout>
  );
};

export default ExploreAnimes;
