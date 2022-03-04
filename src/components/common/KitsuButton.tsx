import React from 'react';
import Image from 'next/image';

interface Props {
  slug: string;
}

const KitsuButton: Component<Props> = ({ slug }) => {
  return (
    <a
      href={`https://kitsu.io/anime/${slug}`}
      target="_blank"
      className="bg-kitsu w-full py-1.5 rounded flex justify-center transition h"
      rel="noreferrer"
    >
      <Image src="/icons/kitsu.png" width={25} height={25} alt="kitsu icon" />
      <span className="mx-3 text-white">Voir sur Kitsu</span>
    </a>
  );
};

export default KitsuButton;
