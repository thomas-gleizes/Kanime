import React, { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';
import { BeatLoader } from 'react-spinners';
import classnames from 'classnames';

import { Animes, Users } from '@types';
import { AnimesApi } from '@api';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import { routes } from '@lib/constants';
import timeout from '@helpers/timeout';

interface Props {
  transparent: boolean;
}

const SearchBar: React.FunctionComponent<Props> = ({ transparent }) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Animes>([]);
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeQuery = ({ target: { value } }) => {
    setQuery(value);

    if (value.length > 3) {
      setLoading(true);

      const animesPromises = AnimesApi.search(value, { limit: 50, skip: 0 })
        .then(({ data }) => setAnimes(data.animes))
        .catch((e) => toast(e.message, 'error'));

      Promise.all([animesPromises]).finally(() => setLoading(false));
    } else {
      setAnimes([]);
      setUsers([]);
    }
  };

  return (
    <div
      className="relative w-full px-2"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <input
        type="search"
        className={classnames(
          'w-full h-[35px] text-gray-100 px-3 rounded duration-500 ease-in-out transition-all',
          {
            'bg-opacity-30 bg-black': transparent,
            'bg-primary-dark bg-opacity-100': !transparent,
          }
        )}
        value={query}
        onChange={handleChangeQuery}
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
          <div className="w-full bg-gray-50 backdrop-blur rounded border border-gray-300 shadow-xl">
            <SimpleBar className="max-h-[60vh]">
              <div className="w-full">
                <div className="py-1 bg-primary rounded-t text-white">
                  <h3 className="text-center text-xl">
                    Animes {loading && <BeatLoader size={12} color="#F59509" />}
                  </h3>
                </div>
                {animes?.length ? (
                  <div onClick={timeout(() => setOpen(false), 10)}>
                    {animes.map((anime) => (
                      <Link key={anime.id} href={`${routes.animes}/${anime.slug}`}>
                        <a>
                          <div
                            id={`anime-search-${anime.id}`}
                            className="my-0.5 py-1.5 px-3 bg-white hover:bg-gray-200 cursor-pointer"
                          >
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
            </SimpleBar>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SearchBar;
