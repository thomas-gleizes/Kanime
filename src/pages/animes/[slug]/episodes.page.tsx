import React from 'react';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { animesMapper } from 'mappers';
import { animeModel } from 'models';
import { SsrError } from 'errors';
import { errorMessage } from 'resources/constants';
import AnimeLayout, { AnimeLayoutProps } from 'components/layouts/pages/AnimeLayout';

interface Props extends AnimeLayoutProps {}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime = await animeModel.findBySlug(slug);

    if (!anime) throw new SsrError(404, errorMessage.ANIME_NOT_FOUND);

    return { props: { anime: animesMapper.one(anime) } };
  }
);

const SagaPage: Page<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Episodes</h1>;
};

SagaPage.layout = AnimeLayout;

export default SagaPage;
