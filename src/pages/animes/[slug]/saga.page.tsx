import React from 'react';
import { NextPage } from 'next';

import { withSessionSsr } from 'services/session.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
  error?: ErrorPage;
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  return { props: { anime } };
});

const SagaPage: Page<Props> = (props) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Saga</h1>
    </div>
  );
};

// @ts-ignore
SagaPage.Layout = AnimeLayout;

export default SagaPage;
