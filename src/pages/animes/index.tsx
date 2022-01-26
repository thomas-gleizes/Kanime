import React, { useEffect, useState } from 'react';
import { GetServerSideProps, NextPage } from 'next';

import { Animes, DefaultResponseData } from '@types';
import appAxios from '@lib/api/appAxios';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { useScrollPercent } from '@hooks';
import toast from '@helpers/toastr';
import AnimeCard from '@components/common/AnimeCard';
import Content from '@layouts/Content';
import Title from '@layouts/Title';

interface Props extends DefaultResponseData {
  animes: Animes;
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { skip, limit } = query;

  const animes = AnimesMapper.many(
    await AnimeModel.all({
      limit: +limit || 40,
      skip: +skip,
    })
  );

  return {
    props: { animes },
  };
};

const ExploreAnimes: NextPage<Props> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Animes>(props.animes);

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
          toast(e.error, 'error');
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
        {animes.map((anime, index) => (
          <div key={index} className="my-3 mx-auto">
            <AnimeCard anime={anime} index={index} />
          </div>
        ))}
      </div>
    </Content>
  );
};

export default ExploreAnimes;
