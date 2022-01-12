import { NextPage } from 'next';
import { AnimeUserStatus } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';

import { Anime, AnimeUser } from '@types';
import appAxios from '@lib/api/appAxios';
import { withSessionSsr } from '@services/session';
import { routes } from '@lib/constants';
import { AnimeModel, AnimeUserModel } from '@models';
import { AnimesMapper, AnimesUsersMapper } from '@mapper';
import { useLayoutContext } from '@context/layout';
import KitsuButton from '@components/common/KitsuButton';
import ListGroup from '@components/common/ListGroup';
import Title from '@layouts/Title';
import EditAnimeUser from '@components/modal/EditAnimeUser';

interface Props {
  anime: Anime;
  animeUser: AnimeUser | null;
}

const DEFAULT_STATUS = 'Ajouter';

export const getServerSideProps = withSessionSsr(async ({ params, req }) => {
  const { slug } = params;

  const anime: Anime = AnimesMapper.one(await AnimeModel.findBySlug(slug as string));

  let animeUser = null;
  if (req.session.user)
    animeUser = AnimesUsersMapper.one(
      await AnimeUserModel.unique(+req.session.user.id, anime.id)
    );

  return { props: { anime: anime, animeUser } };
});

const AnimePage: NextPage<Props> = (props) => {
  const { anime, animeUser } = props;

  const {
    headerTransparentState: [headerTransparent, setHeaderTransparent],
    scrollPercent,
  } = useLayoutContext();

  const [status, setStatus] = useState<string>(DEFAULT_STATUS);

  useEffect(() => {
    const boolean: boolean = scrollPercent < 10;
    if (headerTransparent !== boolean) setHeaderTransparent(boolean);
  }, [scrollPercent]);

  useEffect(() => {
    return () => setHeaderTransparent(false);
  }, []);

  useEffect(() => {
    if (animeUser) setStatus(animeUser.status);
    else setStatus(DEFAULT_STATUS);
  }, [animeUser]);

  if (!anime) return null;

  const handleChangeStatus = async (value) => {
    setStatus(value);

    if (AnimeUserStatus.hasOwnProperty(value))
      if (animeUser)
        await appAxios.patch(`${routes.animes}/${anime.id}/entries`, { status: value });
      else await appAxios.post(`${routes.animes}/${anime.id}/entries`, { status: value });
  };

  return (
    <div className="h-1900">
      <Title>{anime.canonicalTitle}</Title>
      <div className="relative">
        <div
          className="absolute top-[-56px] bottom-0 -z-10 w-full h-[400px] bg-no-repeat bg-cover bg-top"
          style={{ backgroundImage: `url('${anime.cover.small}')` }}
        />
        <div className="flex relative z-30 w-full mx-auto px-10 lg:px-2 pt-[260px] max-w-[1200px]">
          <div className="mx-1 w-full">
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
                <div className="my-2">
                  <KitsuButton slug={anime.slug} />
                </div>
                <div className="my-2">
                  <ListGroup
                    color="amber"
                    value={status}
                    handleChange={(value) => handleChangeStatus(value)}
                    options={
                      animeUser
                        ? [...Object.values(AnimeUserStatus), 'Supprimer']
                        : ['Ajouter', ...Object.values(AnimeUserStatus)]
                    }
                  />
                </div>
              </div>
              {animeUser && <EditAnimeUser anime={anime} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimePage;
