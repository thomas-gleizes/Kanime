import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import classnames from "classnames";

import { animes as animesRoutes } from "../../ressources/routes";
import AnimeProps from "../../helpers/interfaces/anime";

interface Props {
  anime: AnimeProps;
  rank?: string;
  width?: number;
  height?: number;
}

const Anime: React.FC<Props> = ({ anime, rank, width, height }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);

  const handleClick = () => router.push(`${animesRoutes.index}/${anime.slug}`);

  return (
    <div className="bg-primary mx-auto shadow-lg" style={{ width, height }}>
      <div
        className="relative transform transition duration-150 hover:translate-x-1.5 hover:-translate-y-1.5 cursor-pointer bg-cover bg-no-repeat bg-center bg-clip-padding h-full w-full"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={handleClick}
        style={{ backgroundImage: `url(${anime.poster?.small})` }}
      >
        {rank ? (
          <div className="px absolute top-0 right-0 p-1 text-sm bg-primary bg-opacity-70 text-white rounded-bl-md">
            #{rank}
          </div>
        ) : null}
        <div
          className={classnames(
            "absolute bottom-1 w-full px-1 transition duration-150",
            { "opacity-0": !hover, "opacity-100": hover }
          )}
        >
          <div className="text-sm bg-primary text-center w-full px-2 py-1 text-white rounded-md truncate opacity-90">
            {anime.canonicalTitle}
          </div>
        </div>
      </div>
    </div>
  );
};

Anime.defaultProps = {
  width: 160,
  height: 230,
};

export default Anime;
