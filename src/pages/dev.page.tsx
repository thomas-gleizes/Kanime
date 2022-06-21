import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from '@chakra-ui/react';

import { Page } from 'next/app';
import { UsersApi } from 'api';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';
import { ssrHandler } from 'services/handler.service';
import { useDialog } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

export const getServerSideProps = ssrHandler(async () => {
  const anime = await AnimeModel.findById(22);

  return {
    props: {
      anime: AnimesMapper.one(anime),
    },
  };
});

const DevPage: Page<{ anime: Anime }> = ({ anime }) => {
  const dialog = useDialog();

  const [entries, setEntries] = useState<Entries>([]);

  useEffect(() => {
    UsersApi.showEntries(1, {
      include: { anime: true },
      status: 'Completed',
      orderBy: { rating: 'desc' },
    }).then((response) => setEntries(response.entries));
  }, []);

  return (
    <div className="p-10 space-y-1">
      <div>{anime.slug}</div>
      <div>{dayjs(anime.dateEnd).format()}</div>
      <div>{dayjs(anime.dateBegin).toString()}</div>
      <Button onClick={() => dialog.confirm('test')}>Click me</Button>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>{entry.anime.slug}</li>
        ))}
      </ul>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
