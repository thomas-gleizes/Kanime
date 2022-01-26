import { NextPage } from 'next';
import React, { useEffect } from 'react';
import Image from 'next/image';
import Error from 'next/error';
import { FaHeart, FaStar } from 'react-icons/fa';

import { Anime, Entry } from '@types';
import { withSessionSsr } from '@services/session';
import { ErrorPage } from '@errors';
import { errorMessage } from '@lib/constants';
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
