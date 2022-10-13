import React, { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

import { Page } from 'app/next';
import { animesApi } from 'api';
import { animesMapper } from 'mappers';
import { animeModel } from 'models';
import { ssrHandler } from 'services/handler.service';
import { useDelayBoolean, useScrollPercent } from 'hooks';
import Title from 'components/layouts/Title';
import AnimeCard from 'components/common/anime/AnimeCard';
import { getQueryListParams } from 'utils/getQueryListParams';

interface Props extends AnimesListResponse {}

export const getServerSideProps = ssrHandler<Props, { skip?: string; limit?: string }>(
  async ({ query }) => {
    const animes = await animeModel.all(getQueryListParams(query));
    const total = await animeModel.countTotal();

    return {
      props: {
        success: true,
        meta: {
          total,
          count: animes.length,
        },
        records: animesMapper.many(animes),
      },
    };
  }
);

const fetchAnimes = ({ pageParam = 0 }) =>
  animesApi.show({ limit: 40, skip: pageParam * 40 });

const ExploreAnimes: Page<Props> = (props) => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<AnimesListResponse>(
    ['animes'],
    fetchAnimes,
    {
      getNextPageParam: (_, pages) => pages.length,
      initialData: {
        pageParams: [0],
        pages: [props],
      },
      suspense: true,
    }
  );

  const [active, toggle] = useDelayBoolean(5000);
  const percent = useScrollPercent();

  useEffect(() => {
    if (!active && percent > 95 && !isLoading) {
      toggle();
      void fetchNextPage();
    }
  }, [active, percent]);

  const animes = useMemo(
    () => (data ? data.pages.map((page) => page.records).flat() : []),
    [data]
  );

  return (
    <div className="py-10">
      <Title>Animes</Title>
      <div className="max-w-1100 mx-auto w-11/12 mb-400">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-5">
          {animes.map((anime, index) => (
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
