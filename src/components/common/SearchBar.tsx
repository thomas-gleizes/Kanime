import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';
import { BeatLoader } from 'react-spinners';

import { Animes } from '@types';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import { routes } from '@lib/constants';
import timeout from '@helpers/timeout';

interface AnimesListProps {
  query: string;
  active: boolean;
  close: () => void;
}

const AnimesList: React.FunctionComponent<AnimesListProps> = ({
  query,
  active,
  close,
}) => {
  const [animes, setAnimes] = useState<Animes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevQuery, setPrevQuery] = useState(query);

  useEffect(() => {
    if (active && query.length > 3) {
      setLoading(true);
      appAxios
        .get(`${routes.animes}/search`, { params: { query, limit: 50, skip: 0 } })
        .then(({ data }) => setAnimes(data.animes))
        .catch((e) => toast(e.message || 'query invalid', 'error'))
        .finally(() => setLoading(false));
    } else setAnimes([]);
  }, [query, active]);

  return (
    <div className="w-full">
      <div className="py-1 bg-kitsu rounded-t text-white">
        <h3 className="text-center text-xl">
          Animes {loading && <BeatLoader size={12} color="#F59509" />}
        </h3>
      </div>
      {animes.length ? (
        <div onClick={close}>
          {animes.map((anime) => (
            <Link key={anime.id} href={`${routes.animes}/${anime.slug}`}>
              <a>
                <div className="my-0.5 py-1.5 px-3 bg-white bg-opacity-40 hover:bg-opacity-60 cursor-pointer">
                  <div>
                    <h6 className="truncate">{anime.canonicalTitle}</h6>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p className="p-2 text-center">Aucun anime trouvée</p>
        </div>
      )}
    </div>
  );
};

const SearchBar: React.FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="relative w-full px-2"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <input
        type="search"
        className="w-full h-[35px] px-3 bg-gray-300 rounded bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-60"
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
      <div className="absolute top-[55px] w-[96%] right-[2%]">
        <Transition
          show={open}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-0"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-0"
        >
          <div className="w-full bg-gray-50 bg-opacity-30 backdrop-blur rounded border border-gray-300 shadow-xl">
            <SimpleBar className="max-h-[60vh]">
              <AnimesList
                query={query}
                active={true}
                close={timeout(() => setOpen(false), 100)}
              />
            </SimpleBar>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SearchBar;
