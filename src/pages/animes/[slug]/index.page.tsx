import React from 'react';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { useToggle } from 'hooks';
import { animeModel } from 'models';
import { animesMapper } from 'mappers';
import { SsrException } from 'exceptions';
import { errorMessage } from 'resources/constants';
import AnimeSide from 'components/common/anime/AnimeSide';
import AnimeLayout, { AnimeLayoutProps } from 'components/layouts/pages/AnimeLayout';

interface Props extends AnimeLayoutProps {}

const DESCRIPTION_LENGTH = 400;

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime = await animeModel.findBySlug(slug as string);

    if (!anime) throw new SsrException(404, errorMessage.ANIME_NOT_FOUND);

    return { props: { anime: animesMapper.one(anime) } };
  }
);

const AnimeHome: Page<Props> = ({ anime }) => {
  const [extendParagraph, toggleParagraph] = useToggle(true);

  return (
    <div className="w-full flex h-screen">
      <AnimeSide anime={anime} />
      <div className="w-2/3 px-3 mt-4">
        <div className="flex flex-col space-y-2">
          <div>
            <h2 className="text-3xl text-gray-700 font-semibold inline">
              {anime.titles?.en_jp || anime.canonicalTitle}
            </h2>
            <span className="text-gray-500 text-lg ml-2 inline font-black">
              {anime.season_year}
            </span>
          </div>
          <div className="text-amber-500 font-semibold text-md">
            <span>Approuvé à {anime.rating.average}% par la communauté</span>
          </div>
          {anime.description && (
            <div>
              <p className="text-ellipsis overflow-hidden text-gray-800 mb-4 prose">
                {extendParagraph && anime.description?.length > DESCRIPTION_LENGTH
                  ? anime.description.split('').splice(0, DESCRIPTION_LENGTH).join('') +
                    ' ...'
                  : anime?.description}
              </p>
              {anime.description.length > DESCRIPTION_LENGTH && (
                <div
                  className="text-lg text-orange-500 cursor-pointer text-center w-full"
                  onClick={toggleParagraph}
                >
                  <span>read {extendParagraph ? 'more' : 'less'}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AnimeHome.layout = AnimeLayout;

export default AnimeHome;
