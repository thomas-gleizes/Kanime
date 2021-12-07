import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Anime } from "../../types";

const AnimeCard: React.FunctionComponent<Anime> = ({ slug, poster, canonicalTitle }) => {
  return (
    <div className="w-full mx-auto px-2" style={{ width: 250, height: 340 }}>
      <div className="my-3 bg-gradient-to-br from-blue-800 to-blue-600 shadow hover:shadow-lg cursor-pointer transform hover:scale-110 transition border rounded-b rounded-lg">
        <Link href={`/animes/${slug}`}>
          <a>
            <div className="flex justify-center">
              <Image
                src={poster.small}
                width={250}
                height={340}
                alt={canonicalTitle}
                className="mx-auto"
              />
            </div>
            <h3 className="text-center text-white font-bold py-1 truncate px-1">
              {canonicalTitle}
            </h3>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AnimeCard;
