import React from 'react';

import { Page, ServerSideProps } from 'app/next';
import { withSessionSsr } from 'services/session.service';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime?: Anime;
}

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
  async ({ params }) => {
    const { slug } = params;

    const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

    return { props: { anime } };
  }
);

const CharactersPage: Page<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Personnages</h1>;
};

CharactersPage.layout = AnimeLayout;

export default CharactersPage;
