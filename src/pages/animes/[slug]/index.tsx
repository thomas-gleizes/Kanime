import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Error from 'next/error';
import { FaHeart, FaStar } from 'react-icons/fa';

import { Anime, Entry } from '@types';
import { withSessionSsr } from '@services/session';
import { ErrorPage } from '@errors';
import { errorMessage, routes } from '@lib/constants';
import { AnimeModel, EntryModel } from '@models';
import { AnimesMapper, EntriesMapper } from '@mapper';
import { useLayoutContext } from '@context/layout';
import KitsuButton from '@components/common/KitsuButton';
import Title from '@layouts/Title';
import Button from '@components/common/Button';
import { useToggle } from '@hooks';
import EditAnimesEntries from '@components/modal/EditAnimesEntries';

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

const NavLink: React.FunctionComponent<{ href: string; children: string }> = ({
  href,
  children,
}) => {
  return (
    <Link href={href}>
      <a className="px-5 py-2 text-gray-800 text-opacity-50 hover:text-opacity-100 transition duration-100 hover:bg-white">
        {children}
      </a>
    </Link>
  );
};

const AnimePage: NextPage<Props> = ({ anime, animeUser, error }) => {
  const {
    activeTransparentState: [_, setHeaderTransparent],
  } = useLayoutContext();

  const [openModal, toggleModal] = useToggle(false);

  useEffect(() => {
    setHeaderTransparent(true);

    return () => setHeaderTransparent(false);
  }, [setHeaderTransparent]);

  if (error) return <Error statusCode={error.statusCode} title={error.title} />;

  if (!anime) return null;

  return (
    <>
      <div className="h-1900 static">
        <Title>{anime.canonicalTitle}</Title>
        <div className="relative">
          <div
            className="absolute top-[-56px] bottom-0 -z-10 w-full h-[400px] bg-no-repeat bg-cover bg-top bg-kitsu"
            style={{ backgroundImage: `url('${anime.cover?.small}')` }}
          >
            <div className="w-full h-full bg-black bg-opacity-40" />
          </div>
          <div className="flex relative z-30 w-full mx-auto px-10 lg:px-2 pt-[254px] max-w-[1200px]">
            <div className="mx-1 w-full">
              <div className="relative h-[90px]">
                <div className="absolute bottom-0 flex justify-center rounded-t-2xl divide-x-2 divide-gray-300 divide-opacity-50 hover:divide-opacity-100 w-full left-0 bg-gray-100 bg-opacity-40 hover:bg-opacity-100 transition duration-100 ease-linear">
                  <div />
                  <NavLink href={`${routes.animes}/${anime.slug}`}>Résumé</NavLink>
                  <NavLink href={`${routes.animes}/${anime.slug}/discussions`}>
                    Discussions
                  </NavLink>
                  <NavLink href={`${routes.animes}/${anime.slug}/sagas`}>Saga</NavLink>
                  <NavLink href={`${routes.animes}/${anime.slug}/episodes`}>
                    Episodes
                  </NavLink>
                  <NavLink href={`${routes.animes}/${anime.slug}/characters`}>
                    Personnages
                  </NavLink>
                  <div />
                </div>
              </div>
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
              {anime.poster?.small ? (
                <Image
                  // @ts-ignore
                  src={anime.poster.small}
                  width={320}
                  className="rounded-sm shadow-lg"
                  height={440}
                  alt="poster"
                  onClick={() => window?.open(`https://kitsu.io/anime/${anime.slug}`)}
                />
              ) : (
                <div className="bg-blue-200 h-[320px] w-[250px] mb-5 shadow rounded" />
              )}
              <div className="bg-gray-100 border border-gray-200 p-2 rounded shadow">
                <div className="mx-auto my-2">
                  <KitsuButton slug={anime.slug} />
                </div>
                <Button className="w-full" color="sky" onClick={toggleModal}>
                  Ajouter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditAnimesEntries
        isOpen={openModal}
        toggle={toggleModal}
        anime={anime}
        animeUser={animeUser}
      />
    </>
  );
};

export default AnimePage;
