import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";

import { AnimeApi } from "../../api";
import { animes as animesRoutes } from "../../ressources/routes";
import AnimeProps from "../../helpers/interfaces/anime";

const SearchBar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Array<AnimeProps>>([]);

  useEffect(() => {
    (async () => {
      if (query.length >= 3) {
        setLoading(true);
        const { data } = await AnimeApi.search(query);

        setAnimes(data.animes);
        setLoading(false);
      }
    })();
  }, [query]);

  const handleChange = async ({ target }) => {
    setOpen(true);
    setQuery(target.value);
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <div className="relative left-1 mx-3 w-full max-w-400">
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full justify-start rounded-sm shadow-md hover:shadow-xl border-black border-2 border-opacity-50 hover:border-opacity-80 focus:border-opacity-90 my-auto bg-opacity-10 text-md"
      >
        <i className="my-auto mx-1 h-full">
          {!loading ? (
            <FaSearch size={16} className="ml-1 cursor-pointer" />
          ) : (
            <FaSpinner size={16} className="ml-1 animate-spin" />
          )}
        </i>
        <input
          className="ml-2 bg-transparent py-0.5 placeholder-black w-full mx-1"
          value={query}
          onChange={handleChange}
          placeholder="Rechercher..."
        />
      </div>
      {animes?.length && open ? (
        <div className="absolute top-8 w-full my-1 rounded-sm shadow max-h-400 overflow-y-auto">
          {animes.map((anime) => (
            <Link key={anime._id} href={`${animesRoutes.index}/${anime.slug}`}>
              <div
                onClick={handleClick}
                className="border-b p-1 text-md cursor-pointer flex justify-between bg-gray-50 bg-opacity-90 hover:bg-opacity-100"
              >
                <img src={anime.poster?.tiny} className="h-24" alt="poster" />
                <div className="w-full flex">
                  <div className="w-2/3 mx-auto text-sm">{anime.canonicalTitle}</div>
                  <div>
                    <span className="w-1/3 bg-gray-400 px-4 py-1 font-bold text-sm text-white rounded-lg shadow">
                      {anime.type}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="w-full bg-gray-50">
            <div className="text-center py-2.5">
              <button className="bg-red-600 rounded-md mx-auto text-white px-5 py-0.5">
                Voir plus
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
