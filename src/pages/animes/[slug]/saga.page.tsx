import React from 'react';
import { NextPage } from 'next';

import { withSessionSsr } from 'services/session.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  return { props: { anime } };
});

const SagaPage: NextPage<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Saga</h1>;
};

// @ts-ignore
SagaPage.Layout = AnimeLayout;

export default SagaPage;
