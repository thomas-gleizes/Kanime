import React from 'react';

import { Page, ServerSideProps } from 'next/app';
import { withSessionSsr } from 'services/session.service';
import { useToggle } from 'hooks';
import { AnimeModel } from 'models';
import { AnimesMapper } from 'mapper';
import AnimeSide from 'components/anime/AnimeSide';
import AnimeLayout from 'components/layouts/pages/AnimeLayout';

interface Props {
  anime: Anime;
}

const DESCRIPTION_LENGTH = 400;

export const getServerSideProps: ServerSideProps<Props> = withSessionSsr(
  async ({ params }) => {
    const { slug } = params;

    const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

    return { props: { anime } };
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
              <div
                className="text-lg text-orange-500 cursor-pointer text-center w-full"
                onClick={toggleParagraph}
              >
                <span>read {extendParagraph ? 'more' : 'less'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

AnimeHome.layout = AnimeLayout;

export default AnimeHome;
