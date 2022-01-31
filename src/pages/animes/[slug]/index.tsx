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

const AnimeHome: NextPage<Props> = ({ anime }) => {
  console.log('Anime', anime);

  const Item = ({ label, content }) => (
    <li className="text-sm">
      <strong>{label} : </strong>
      <span>{content}</span>
    </li>
  );

  return (
    <div className="w-full my-5 flex">
      <div className="w-1/3 h-100">
        <div className="bg-white border shadow p-2 ">
          <h2 className="text-md font-medium mb-2">Details de l'anime</h2>
          <ul>
            <Item label="Anglais" content={anime.titles.en} />
            <Item label="Japonais" content={anime.titles.en_jp} />
            <Item label="Japonais (Romaji)" content={anime.titles.ja_jp} />
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-medium px-1">{anime.canonicalTitle}</h2>
      </div>
    </div>
  );
};

// TODO fix types
// @ts-ignore
AnimeHome.Layout = AnimeLayout;

export default AnimeHome;
