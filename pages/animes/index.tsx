import React from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { Anime, DefaultResponseData } from '@types';
import appAxios from '../../lib/api/appAxios';
import AnimeCard from '../../components/common/AnimeCard';

interface Props extends DefaultResponseData {
  animes: Array<Anime>;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { data } = await appAxios.get<Props>('animes', { params: context.query });

  return { props: data };
};

const ExploreAnimes: NextPage<Props> = ({ animes }) => {
  return (
    <div className="grid grid-cols-4 max-w-1100 mx-auto my-10">
      {animes.map((anime: Anime, index: number) => (
        <div key={index} className="my-3 mx-auto">
          <AnimeCard {...anime} />
        </div>
      ))}
    </div>
  );
};

export default ExploreAnimes;
