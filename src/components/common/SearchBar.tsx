import React, { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';

import { Animes } from '@types';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import { routes } from '@lib/constants';

const SearchBar: React.FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [animes, setAnimes] = useState<Animes>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
    setLoading(true);

    if (value.length > 3)
      appAxios
        .get(`${routes.animes}/search`, { params: { query: value, limit: 50, skip: 0 } })
        .then(({ data }) => setAnimes(data.animes))
        .catch((e) => toast(e.message || 'query invalid', 'error'))
        .finally(() => setLoading(false));
  };

  return (
    <div
      className="relative w-full px-2"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <input
        type="search"
        className="w-full h-[35px] px-5 bg-gray-300 rounded bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-60"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute top-[55px] w-[90%] right-2">
        <Transition
          show={open}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="w-full bg-gray-100 rounded border border-gray-300 shadow-xl">
            <SimpleBar className="max-h-[60vh]">
              {animes.length ? (
                <div className="" onClick={() => setOpen(false)}>
                  {animes.map((anime) => (
                    <Link href={`${routes.animes}/${anime.slug}`}>
                      <div className="my-0.5 py-1.5 px-3 bg-white cursor-pointer">
                        {anime.canonicalTitle}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div>
                  <p>Aucun résultat</p>
                </div>
              )}
            </SimpleBar>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SearchBar;
