import { GetServerSideProps, NextPage } from 'next';
import { AnimeUserStatus } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaHeart, FaPlus, FaStar } from 'react-icons/fa';

import { Anime, DefaultResponseData } from '@types';
import { AnimeModel } from '@models';
import { AnimesMapper } from '@mapper';
import { useLayoutContext } from '@context/layout';
import Title from '@layouts/Title';
import KitsuButton from '@components/common/KitsuButton';
import appAxios from '@lib/api/appAxios';
import { routes } from '@lib/constants';

interface Props extends DefaultResponseData {
  anime: Anime;
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { slug } = context.params;

  const anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  return { props: { anime } };
};

const AnimePage: NextPage<Props> = ({ anime }) => {
  const {
    headerTransparentState: [headerTransparent, setHeaderTransparent],
    scrollPercent,
  } = useLayoutContext();

  useEffect(() => {
    const boolean: boolean = scrollPercent < 10;
    if (headerTransparent !== boolean) setHeaderTransparent(boolean);
  }, [scrollPercent]);

  useEffect(() => {
    return () => setHeaderTransparent(false);
  }, []);

  if (!anime) return null;

  const handleAdd = async (event) => {
    const res = await appAxios.post(`${routes.animes}/${anime.id}/entries`, {
      status: AnimeUserStatus.Watching,
    });
    console.log('Res', res);
  };

  const handleDelete = async (event) => {
    const res = await appAxios.delete(`${routes.animes}/${anime.id}/entries`);
    console.log('Res', res);
  };

  return (
    <div className="h-1900">
      <Title>{anime.canonicalTitle}</Title>
      <div className="relative">
        <div
          className="absolute top-[-56px] bottom-0 -z-10 w-full h-[400px] bg-primary bg-top"
          style={{ backgroundImage: `url('${anime.cover.small}')` }}
        />
        <div className="flex relative z-30 w-full mx-auto px-10 lg:px-2 pt-[240px] max-w-[1200px]">
          <div className="mx-1 w-full mt-[10px]">
            <div className="h-20 w-full border rounded" />
            <div className="mx-1 py-3 divide-opacity-10 divide-y-2">
              <div className="flex justify-between py-1">
                <h2 className="text-3xl">
                  {anime.canonicalTitle}{' '}
                  <span className="text-md mt-2 ml-2 text-opacity-70">
                    ({anime.type})
                  </span>
                </h2>
                <h3 className="align-sub">
                  {anime.season} ({anime.season_year})
                </h3>
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
          <div className="sticky top-[250px] mx-4">
            <Image
              // @ts-ignore
              src={anime.poster.small}
              width={320}
              className="rounded-sm shadow-lg"
              height={440}
              alt="poster"
              onClick={() => window?.open(`https://kitsu.io/anime/${anime.slug}`)}
            />
            <div>
              <div className="mx-auto">
                <div className="my-1">
                  <button
                    onClick={handleAdd}
                    className="w-full text-white rounded bg-primary py-1 shadow-lg hover:shadow-2xl hover:scale-105 transform transition"
                  >
                    <span className="flex justify-center font-bold">
                      Ajouter
                      <i className="ml-2 my-auto">
                        <FaPlus />
                      </i>
                    </span>
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full text-white rounded bg-primary py-1 shadow-lg hover:shadow-2xl hover:scale-105 transform transition"
                  >
                    <span className="flex justify-center font-bold">
                      Delete
                      <i className="ml-2 my-auto">
                        <FaPlus />
                      </i>
                    </span>
                  </button>
                </div>
                <div className="my-2">
                  <KitsuButton slug={anime.slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
