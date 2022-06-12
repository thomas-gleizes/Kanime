import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@chakra-ui/react';

import { Page } from 'next/app';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';
import { ssrHandler } from 'services/handler.service';
import { useDialog } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

export const getServerSideProps = ssrHandler(async (context) => {
  const anime = await AnimeModel.findById(15484);

  return {
    props: {
      anime: AnimesMapper.one(anime),
    },
  };
});

const DevPage: Page<{ anime: Anime }> = ({ anime }) => {
  const dialog = useDialog();

  return (
    <div className="p-10 space-y-1">
      <div>{anime.slug}</div>
      <div>{dayjs(anime.dateEnd).format()}</div>
      <div>{dayjs(anime.dateBegin).toString()}</div>
      <Button onClick={() => dialog.confirm('test')}>Click me</Button>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
