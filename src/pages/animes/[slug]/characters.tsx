import React from 'react';
import { NextPage } from 'next';

import AnimeLayout from '@layouts/pages/AnimeLayout';
import { withSessionSsr } from '@services/session';
import { Anime } from '@types';
import { AnimesMapper } from '@mapper';
import { AnimeModel } from '@models';
import { ErrorPage } from '@errors';
import { errorMessage } from '@lib/constants';

interface Props {
  anime: Anime;
  error?: ErrorPage;
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime)
    return { props: { error: ErrorPage.create(404, errorMessage.ANIME_NOT_FOUND) } };

  return { props: { anime } };
});

const CharactersPage: NextPage<Props> = (props) => {
  return <div>characters</div>;
};

// @ts-ignore
CharactersPage.Layout = AnimeLayout;

export default CharactersPage;
