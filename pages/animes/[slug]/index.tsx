import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaHeart, FaPlus, FaStar } from 'react-icons/fa';

import { Anime, DefaultResponseData } from '@types';
import { AnimeModel } from '@models';
import { AnimesResources } from '@resources';

interface Props extends DefaultResponseData {
  anime: Anime;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.params;

  const anime = AnimesResources.one(await AnimeModel.findBySlug(slug as string));

  return { props: { anime } };
};

const Index: NextPage<Props> = ({ anime }) => {
  if (!anime) return null;

  return (
    <div>
      <Head>
        <title>
          {anime.canonicalTitle} | {process.env.NEXT_PUBLIC_SITE_NAME}
        </title>
      </Head>
      <div className="relative mb-20">
        <div
          className="absolute top-0 bottom-0 -z-10 w-full h-full bg-gradient-to-b from-red-800 bg-cover bg-center"
          style={{
            backgroundImage: `url('${anime.cover.small}')`,
            height: '330px',
          }}
        />
        <div
          className="flex z-30 w-full mx-auto px-10 lg:px-2"
          style={{ maxWidth: '1200px', paddingTop: '240px' }}
        >
          <div className="mx-1 w-full">
            <div className="h-20 w-full border" />
            <div className="mx-1 py-3 divide-opacity-10 divide-y-2">
              <div className="flex py-1">
                <h2 className="text-3xl">{anime.canonicalTitle}</h2>
                <span className="text-md mt-2 ml-2 text-opacity-70">
                  ({anime.season})
                </span>
              </div>
              <div className="flex w-full py-2 justify-between">
                <div className="flex text-sm">
                  <i className="mx-1">
                    <FaStar size={18} className="text-yellow-400" />
                  </i>
                  <span>
                    Rank {anime.rating.rank} ({anime.rating.average}%)
                  </span>
                </div>
                <div className="flex text-sm">
                  <span>
                    Rank {anime.popularity.rank} ({anime.popularity.count})
                  </span>
                  <i className="mx-1">
                    <FaHeart size={18} className="text-red-700" />
                  </i>
                </div>
              </div>
              <div className="py-1">
                <p className="text-justify"> {anime?.description}</p>
              </div>
            </div>
          </div>
          <div className="mx-4">
            <div className="border border-black">
              <Image
                width={280}
                height={390}
                className="rounded-sm shadow-lg mb-3"
                src={anime.poster.small}
                alt="poster"
                onClick={() => window?.open(`https://kitsu.io/anime/${anime.slug}`)}
              />
            </div>
            <div>
              <div className="mx-auto">
                <div className="my-1">
                  <button className="w-full text-white rounded bg-gradient-to-tl from-red-500 to-yellow-500 py-1 shadow-lg hover:shadow-2xl hover:scale-105 transform transition">
                    <span className="flex justify-center font-bold">
                      Ajouter
                      <i className="ml-2 my-auto">
                        <FaPlus />
                      </i>
                    </span>
                  </button>
                </div>
                {/*<div className="my-1">*/}
                {/*  <KitsuButton slug={anime?.slug} />*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
