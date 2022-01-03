import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { Anime, DefaultResponseData } from '@types';
import { AnimeModel } from '@models';
import { AnimesResources } from '@resources';
import AnimeCard from '../../components/common/AnimeCard';
import { useScrollPercent } from '../../hooks';
import appAxios from '../../lib/api/appAxios';
import Content from '@layouts/Content';
import Title from '@layouts/Title';

interface Props extends DefaultResponseData {
  animes: Array<Anime>;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { skip, limit } = query;

  const animes = AnimesResources.many(
    await AnimeModel.getMany({
      limit: +limit | 40,
      skip: +skip,
    })
  );

  return {
    props: { animes },
  };
};

const ExploreAnimes: NextPage<Props> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Anime[]>(props.animes);

  const percent = useScrollPercent();

  useEffect(() => {
    (async () => {
      if (percent > 80 && !isLoading) {
        setLoading(true);

        try {
          const response = await appAxios.get('animes', {
            params: { limit: 40, skip: animes.length },
          });

          setAnimes([...animes, ...response.data.animes]);
        } catch (e) {
          console.error(e);
        } finally {
          setLoading(false);
        }
      }
    })();
  }, [percent]);

  return (
    <Content>
      <Title>Animes</Title>
      <div className="grid grid-cols-4 max-w-1100 mx-auto">
        {animes.map((anime: Anime, index: number) => (
          <div key={index} className="my-3 mx-auto">
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>
    </Content>
  );
};

export default ExploreAnimes;
