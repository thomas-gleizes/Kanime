import React from 'react';
import { NextPage } from 'next';

import AnimeLayout from '@layouts/pages/AnimeLayout';
import { withSessionSsr } from '@services/session.service';
import { Anime } from '@types';
import { AnimesMapper } from '@mapper';
import { AnimeModel } from '@models';
import { ErrorPage } from '@errors';
import { errorMessage } from '@lib/constants';
import { PrismaClient } from '@prisma/client';

interface Props {
  anime: Anime;
  saga: any;
  error?: ErrorPage;
}

export const getServerSideProps = withSessionSsr(async ({ params }) => {
  const { slug } = params;

  const prisma = new PrismaClient();

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  const saga = await prisma.saga.findMany({
    where: { id: anime.sagaId },
    include: {
      animes: true,
    },
  });

  if (!anime)
    return { props: { error: ErrorPage.create(404, errorMessage.ANIME_NOT_FOUND) } };

  return { props: { anime, saga } };
});

const SagaPage: NextPage<Props> = (props) => {
  console.log('Props', props);

  return (
    <div>
      <h1 className="text-xl font-black text-center">Saga</h1>
    </div>
  );
};

// @ts-ignore
SagaPage.Layout = AnimeLayout;

export default SagaPage;
