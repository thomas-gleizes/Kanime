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

const DiscussionsPage: NextPage<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Discussions</h1>;
};

// @ts-ignore
DiscussionsPage.Layout = AnimeLayout;

export default DiscussionsPage;
