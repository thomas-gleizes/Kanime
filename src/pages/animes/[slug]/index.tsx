import React from 'react';
import { NextPage } from 'next';

import { Anime, Entry } from '@types';
import { withSessionSsr } from '@services/session';
import { ErrorPage } from '@errors';
import { errorMessage } from '@lib/constants';
import { AnimeModel, EntryModel } from '@models';
import { AnimesMapper, EntriesMapper } from '@mapper';
import AnimeLayout from '@layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
  animeUser: Entry | null;
  error?: ErrorPage;
}

export const getServerSideProps = withSessionSsr(async ({ params, req }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime)
    return { props: { error: ErrorPage.create(404, errorMessage.ANIME_NOT_FOUND) } };

  let animeUser = null;
  if (req.session.user)
    animeUser = EntriesMapper.one(
      await EntryModel.unique(+req.session.user.id, anime.id)
    );

  return { props: { anime: anime, animeUser } };
});

const AnimeHome: NextPage<Props> = (props) => {
  return (
    <div className="w-full py-5 bg-red-300">
      <p className="w-11/12 mx-auto text-justify">{props.anime.synopsis}</p>
      <p className="w-11/12 mx-auto text-justify">{props.anime.description}</p>
      <p className="w-11/12 mx-auto text-justify">{props.anime.description}</p>
      <p className="w-11/12 mx-auto text-justify">{props.anime.description}</p>
      <p className="w-11/12 mx-auto text-justify">{props.anime.description}</p>
      <p className="w-11/12 mx-auto text-justify">{props.anime.description}</p>
    </div>
  );
};

// TODO fix types
// @ts-ignore
AnimeHome.Layout = AnimeLayout;

export default AnimeHome;
