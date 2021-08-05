import React from "react";
import Image from "./Image";

interface Props {
  slug: string;
}

const KitsuButton: React.FC<Props> = ({ slug }) => {
  return (
    <button
      onClick={() => window?.open(`https://kitsu.io/anime/${slug}`)}
      className="bg-kitsu w-full py-1 rounded"
    >
      <span className="flex justify-center text-white">
        <Image
          src="/icon/kitsu-icon.png"
          width={22}
          alt="kitsu icon"
          className="mr-2"
        />
        Voir sur Kitsu
      </span>
    </button>
  );
};

export default KitsuButton;
