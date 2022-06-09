import React, { useEffect, useState } from 'react';

import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import { ApiService } from 'services/api.service';
import { Spinner } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ssrHandler } from 'services/handler.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';
import { Page } from 'next/app';

export const getServerSideProps = ssrHandler(async (context) => {
  const anime = await AnimeModel.findById(15484);

  return {
    props: {
      anime: AnimesMapper.one(anime),
    },
  };
});

const DevPage: Page<{ anime: Anime }> = ({ anime }) => {
  return (
    <div className="p-10 space-y-1">
      <div>{anime.slug}</div>
      <div>{dayjs(anime.dateEnd).format()}</div>
      <div>{dayjs(anime.dateBegin).toString()}</div>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;

class PromiseD {}
