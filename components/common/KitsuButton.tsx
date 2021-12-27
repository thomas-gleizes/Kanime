import React from 'react';
import Image from 'next/image';

interface Props {
  slug: string;
}

const KitsuButton: React.FC<Props> = ({ slug }) => {
  return (
    <button
      onClick={() => window?.open(`https://kitsu.io/anime/${slug}`)}
      className="bg-kitsu w-full py-1.5 rounded flex justify-center"
    >
      <Image src="/icons/kitsu.png" width={25} height={25} alt="kitsu icon" />
      <span className="mx-3 text-white">Voir sur Kitsu</span>
    </button>
  );
};

export default KitsuButton;
