import React, { useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { Transition } from '@headlessui/react';
import { HeartIcon, StarIcon } from '@heroicons/react/solid';

interface Props {
  anime: Anime;
  isOpen: boolean;
  position: 'left' | 'right';
}

const AnimePopup: Component<Props> = ({ anime, isOpen, position }) => {
  const { synopsis, canonicalTitle, season_year, rating, popularity, type } = anime;

  const styles = useMemo(() => ({ [position]: '104%' }), [position]);

  const [render, setRender] = useState<boolean>(isOpen);

  useEffect(() => {
    if (isOpen) setRender(true);
    else setTimeout(() => setRender(true), 80);
  }, [isOpen]);

  if (!render) return null;

  return (
    <div
      className={classnames('hidden md:block absolute w-[330px] f-full z-80 top-0')}
      style={styles}
    >
      <Transition
        show={isOpen}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-0"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="relative flex flex-col bg-primary-dark w-full rounded shadow-lg p-4">
          <div className="h-1/3">
            <div className="flex justify-between flex-wrap mb-2">
              <h3 className="text-white text-lg truncate font-medium">
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
                  Note moy : {rating.average}%
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
                  <span className="text-white mx-2 truncate">#{rating.rank}</span>
                </div>
              ) : (
                <div className="w-1/12" />
              )}
              {popularity.rank ? (
                <div className="flex justify-end w-1/2">
                  <span className="text-white mx-2 truncate">#{popularity.rank}</span>
                  <HeartIcon className="text-red-500 h-5 w-5" />
                </div>
              ) : (
                <div className="w-1/12" />
              )}
            </div>
          </div>
          <div className="h-2/3 overflow-hidden bg-transparent">
            <p className="relative bottom-0 text-gray-300 text-light text-sm text-justify line-clamp-10 overflow-hidden">
              {synopsis}
              {synopsis?.length > 500 && (
                <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-b from-transparent to-primary-dark" />
              )}
            </p>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default AnimePopup;
