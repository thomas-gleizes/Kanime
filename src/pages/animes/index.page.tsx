import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

import { Page } from 'next/app';
import { AnimesApi } from 'api';
import { AnimesMapper } from 'mappers';
import { AnimeModel } from 'models';
import { ssrHandler } from 'services/handler.service';
import { useDelayBoolean, useScrollPercent } from 'hooks';
import Title from 'components/layouts/Title';
import AnimeCard from 'components/common/anime/AnimeCard';

interface Props {
  animes: Animes;
}

export const getServerSideProps = ssrHandler<Props, { skip?: string; limit?: string }>(
  async ({ query }) => {
    const { offset, limit } = query;

    const animes = await AnimeModel.all({ limit: +limit || 40, skip: +offset || 0 });

    return {
      props: { animes: AnimesMapper.many(animes) },
    };
  }
);

const fetchAnimes = ({ pageParam = 0 }) =>
  AnimesApi.showAll({ limit: 40, skip: pageParam * 40 }).then((data) => data.animes);

const ExploreAnimes: Page<Props> = (props) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<Animes>(
    ['animes'],
    fetchAnimes,
    {
      getNextPageParam: (_, pages) => pages.length,
      initialData: { pageParams: [0], pages: [props.animes] },
      suspense: true,
    }
  );

  const [active, toggle] = useDelayBoolean(5000);
  const percent = useScrollPercent();

  useEffect(() => {
    if (!active && percent > 95) {
      toggle();
      void fetchNextPage();
    }
  }, [active, percent]);

  return (
    <div className="py-10">
      <Title>Animes</Title>
      <div className="max-w-1100 mx-auto w-11/12 mb-400">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-5">
          {data.pages.flat().map((anime, index) => (
            <AnimeCard key={index} anime={anime} popupPosition={'left'} />
          ))}
        </div>
        {isLoading && (
          <div className="text-center">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreAnimes;
