import React from 'react';
import { NextPage } from 'next';
import classnames from 'classnames';

import { Anime, Entry } from '@types';
import { withSessionSsr } from '@services/session';
import { ErrorPage } from '@errors';
import { errorMessage } from '@lib/constants';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { useToggle } from '@hooks';
import AnimeSide from '@components/anime/animeSide';
import AnimeLayout from '@layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
  animeUser: Entry;
  error?: ErrorPage;
}

export const getServerSideProps = withSessionSsr(async ({ params, req }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  if (!anime)
    return { props: { error: ErrorPage.create(404, errorMessage.ANIME_NOT_FOUND) } };

  return { props: { anime: anime } };
});

const AnimeHome: NextPage<Props> = ({ anime }) => {
  const [extendParagraph, toggleParagraph] = useToggle(true);

  return (
    <div className="w-full my-5 flex">
      <AnimeSide anime={anime} />
      <div className="w-2/3 px-2">
        <div className=" flex flex-col space-y-2">
          <div>
            <h2 className="text-3xl text-gray-700 font-semibold inline">
              {anime.titles.en_jp || anime.canonicalTitle}
            </h2>
            <span className="text-gray-500 text-xl ml-2 inline">{anime.season_year}</span>
          </div>
          <div className="text-amber-500 font-semibold text-md">
            <span>Approuvé à 71.97% par la communauté</span>
          </div>
          <div>
            <p className="text-ellipsis overflow-hidden text-gray-800 mb-4">
              {extendParagraph
                ? anime.description.split('').splice(0, 400).join('') + ' ...'
                : anime.description}
            </p>
            <div
              className="text-lg text-orange-500 cursor-pointer text-center w-full"
              onClick={toggleParagraph}
            >
              <span>read {extendParagraph ? 'more' : 'less'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// TODO fix types
// @ts-ignore
AnimeHome.Layout = AnimeLayout;

export default AnimeHome;
