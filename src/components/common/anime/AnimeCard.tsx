import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useHovered } from 'hooks';
import { routes } from 'resources/routes';
import AnimePopup from 'components/common/anime/AnimePopup';

interface Props {
  anime: Anime;
  index: number;
}

const AnimeCard: Component<Props> = ({ anime, index }) => {
  const { slug, poster, canonicalTitle } = anime;

  const [ref, isHover] = useHovered<HTMLDivElement>();

  return (
    <div className="relative w-full mx-auto px-2" style={{ width: 250, height: 340 }}>
      <div
        ref={ref}
        className="my-3 bg-primary shadow hover:shadow-lg cursor-pointer border rounded-b rounded-lg"
      >
        <Link href={`${routes.animes.list}/${slug}`}>
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
        isOpen={isHover}
        position={[0, 1].includes(index % 4) ? 'left' : 'right'}
      />
    </div>
  );
};

export default AnimeCard;
