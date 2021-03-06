import React from 'react';
import Image from 'next/image';

import { Page } from 'next/app';
import { ssrHandler } from 'services/handler.service';
import { AnimeModel, SagaModel } from 'models';
import { AnimesMapper, SagasMapper } from 'mappers';
import { SsrError } from 'errors';
import { errorMessage } from 'resources/constants';
import AnimeLayout, { AnimeLayoutProps } from 'components/layouts/pages/AnimeLayout';

interface Props extends AnimeLayoutProps {
  saga: Saga;
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const { slug } = params;

    const anime = await AnimeModel.findBySlug(slug);

    if (!anime || !anime.saga_id) throw new SsrError(404, errorMessage.ANIME_NOT_FOUND);

    const saga = await SagaModel.findById(anime.saga_id);

    return {
      props: {
        anime: AnimesMapper.one(anime),
        saga: SagasMapper.one(saga),
      },
    };
  }
);

const SagaPage: Page<Props> = ({ saga, anime }) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Saga</h1>

      <div className="bg-gray-50 px-5 mt-3">
        <div className="flex flex-col space-y-2">
          {saga.animes
            .filter((a) => a.id !== anime.id)
            .map((anime, index) => (
              <div
                key={index}
                className="bg-white shadow border rounded-xl px-3 py-2 w-full"
              >
                <div className="flex">
                  <Image
                    className="rounded-lg"
                    src={anime.poster.small as string}
                    width={158}
                    height={224}
                    alt={anime.slug}
                  />
                  <div className="w-full">
                    <div>
                      <h2 className="text-center text-lg font-extrabold">
                        {anime.canonicalTitle}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

SagaPage.layout = AnimeLayout;

export default SagaPage;
