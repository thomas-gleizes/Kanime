import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, HeartIcon } from '@heroicons/react/solid';
import { Transition } from '@headlessui/react';

import { Anime } from '@types';
import { routes } from '@lib/constants';

interface Props {
  anime: Anime;
  index: number;
}

interface AnimePopupProps {
  anime: Anime;
  isOpen: boolean;
  position: 'left' | 'right';
}

const AnimePopup: React.FunctionComponent<AnimePopupProps> = ({
  anime,
  isOpen,
  position,
}) => {
  const { synopsis, canonicalTitle, season_year, rating, popularity, type } = anime;

  const styles = useMemo(() => {
    const styles = {};
    styles[position] = '100%';

    return styles;
  }, [position]);

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-0"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div
        className="absolute flex flex-col w-400 top-0 h-[103%] z-50 bg-primary-dark rounded shadow-lg p-4"
        style={styles}
      >
        <div className="flex justify-between flex-wrap mb-2">
          <h3 className="text-white text-lg font-medium">
            {canonicalTitle}
            <span className="text-gray-400 text-sm"> ({type}) </span>
          </h3>
          <span className="text-gray-400 text-xl mx-2 my-auto">{season_year}</span>
        </div>
        <div className="flex justify-between text-md mb-2">
          {rating.average ? (
            <div
              className={`w-1/2 ${
                rating.average >= 75
                  ? 'text-green-500'
                  : rating.average >= 50
                  ? 'text-yellow-500'
                  : 'text-red-400'
              }`}
            >
              Note moyenne : {rating.average}%
            </div>
          ) : (
            <div className="w-1/12" />
          )}
          {popularity.count && (
            <div className="text-lg w-1/2 text-right text-gray-300">
              {popularity.count} utilisateur
            </div>
          )}
        </div>
        <div className="flex justify-between text-sm mb-2">
          {rating.rank ? (
            <div className="flex justify-start w-1/2">
              <StarIcon className="text-yellow-500 h-5 w-5" />
              <span className="text-white mx-2 truncate">
                #{rating.rank} le mieux noté
              </span>
            </div>
          ) : (
            <div className="w-1/12" />
          )}
          {popularity.rank ? (
            <div className="flex justify-end w-1/2">
              <span className="text-white mx-2 truncate">
                #{popularity.rank} le plus populaire
              </span>
              <HeartIcon className="text-red-500 h-5 w-5" />
            </div>
          ) : (
            <div className="w-1/12" />
          )}
        </div>
        <div className="h-auto overflow-hidden">
          <p className="text-gray-300 text-light text-sm text-justify p-truncate-9 overflow-hidden">
            {synopsis}
          </p>
        </div>
      </div>
    </Transition>
  );
};

const AnimeCard: React.FunctionComponent<Props> = ({ anime, index }) => {
  const { slug, poster, canonicalTitle } = anime;

  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative w-full mx-auto px-2" style={{ width: 250, height: 340 }}>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="my-3 bg-primary shadow hover:shadow-lg cursor-pointer border rounded-b rounded-lg"
      >
        <Link href={`${routes.animes}/${slug}`}>
          <a>
            <div className="flex justify-center">
              {poster?.small ? (
                <Image
                  //@ts-ignore
                  src={poster.small}
                  width={250}
                  height={340}
                  alt={canonicalTitle}
                  className="mx-auto"
                />
              ) : (
                <div className="bg-primary-dark w-[232px] h-[315px]" />
              )}
            </div>
            <h3 className="text-center text-white font-bold py-1 truncate px-2">
              {canonicalTitle}
            </h3>
          </a>
        </Link>
      </div>
      <AnimePopup
        anime={anime}
        isOpen={open}
        position={[0, 1].includes(index % 4) ? 'left' : 'right'}
      />
    </div>
  );
};

export default AnimeCard;
