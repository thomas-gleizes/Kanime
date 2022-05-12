import React from 'react';

import { Page } from 'app/next';
import { ssrHandler } from 'services/handler.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mappers';
import { SsrError } from 'class/error';
import { errorMessage } from 'resources/constants';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime?: Anime;
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

    if (!anime) throw new SsrError(404, errorMessage.ANIME_NOT_FOUND);

    return { props: { anime } };
  }
);

const CharactersPage: Page<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Personnages</h1>;
};

CharactersPage.layout = AnimeLayout;

export default CharactersPage;
