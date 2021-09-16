import React from "react";
import Link from "next/link";
import Slider from "react-slick";

import Anime from "./Anime";
import AnimeProps from "../../helpers/interfaces/anime";

interface Props {
  title: string;
  link: string;
  animes: Array<AnimeProps>;
  ranking?: string;
}

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 500,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const SliderAnime: React.FC<Props> = ({ title, link, animes, ranking }) => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 border shadow rounded p-2 mb-5">
      <h2 className="text-center mb-3 text-lg italic text-primary font-bold">{title}</h2>
      <div>
        <Slider {...settings}>
          {animes?.map((anime, index) => (
            <div key={index} className="my-3">
              <Anime
                key={index}
                rank={anime[ranking]?.rank}
                anime={anime}
                width={160}
                height={230}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="flex justify-end my-1">
        <Link href={link || ""}>
          <a className="text-sm text-primary font-semibold cursor-pointer pt-1 hover:underline">
            Voir plus
          </a>
        </Link>
      </div>
    </div>
  );
};

SliderAnime.defaultProps = {
  title: "",
  link: "",
  animes: [],
};

export default SliderAnime;
