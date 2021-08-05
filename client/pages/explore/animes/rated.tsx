import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { AnimeApi } from "../../../api";
import { useFetch, useToggle } from "../../../helpers/hooks";
import Button from "../../../components/common/Form/Button";
import SlideAnime from "../../../components/common/SlideAnime";
import Layout from "../../../components/layouts/Layout";

const limit = 24;

const Rated: React.FC = () => {
  const [offset, setOffset] = useState<number>(0);
  const [toggle, handleToggle] = useToggle(false);

  const [{ animes }] = useFetch(AnimeApi.mostRated, { limit, offset }, [
    toggle,
  ]);

  useEffect(() => {
    setOffset(animes?.length || 0);
  }, [animes]);

  return (
    <Layout className="w-full max-w-1100 mx-auto flex flex-wrap-reverse md:flex-nowrap pt-20">
      <div className="w-full">
        <div>
          <div className="bg-test">
            <h1 className="text-2xl w-52 mx-auto my-2 font-semibold">
              Les meilleurs notes
            </h1>
          </div>
          <div className="group flex transition my-2 mx-5 shadow border-2 border-gray-300 rounded-md focus-within:border-blue-400 focus-within:shadow-lg">
            <i className="ml-4 opacity-50 group-hover:opacity-100 transition duration-200 h-auto my-auto">
              <FaSearch size={24} />
            </i>
            <input
              placeholder="recherchée un anime"
              className="px-4 py-2 w-auto text-xl bg-transparent w-full"
              type="text"
            />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 py-0.5">
            {animes?.length
              ? animes.map((anime) => (
                  <div key={anime.id} className="my-2">
                    <SlideAnime
                      anime={anime}
                      rank={anime.ratingRank}
                      width={180}
                      height={250}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="text-center">
          <Button onClick={handleToggle}> Afficher plus </Button>
        </div>
      </div>
      <div className="relative max-h-full md:max-w-350 w-full md:mt-24 px-2 py-4">
        <div className="sticky top-20 bg-red-300">
          <div className="text-center h-96" />
        </div>
      </div>
    </Layout>
  );
};

export default Rated;
