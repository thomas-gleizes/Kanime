import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

import { Animes } from '@types';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import { routes } from '@lib/constants';

const SearchBar: React.FunctionComponent = () => {
  const [query, setQuery] = useState<string>('');
  const [animes, setAnimes] = useState<Animes>([]);
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = ({ target: { value } }) => {
    setQuery(value);

    if (value.length > 3)
      appAxios
        .get(`${routes.animes}/search`, { params: { query: value, limit: 50, skip: 0 } })
        .then(({ data }) => setAnimes(data.animes))
        .catch((e) => toast(e.message || 'query invalid', 'error'));
  };

  return (
    <div className="w-full px-2 ">
      <input
        type="search"
        className="w-full h-[90%] px-5 bg-gray-300 rounded bg-opacity-10 hover:bg-opacity-20 focus:bg-opacity-60"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute top-[60px]">
        <Transition
          show={true}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="w-full bg-white rounded border border-gray-300 shadow-xl p-2">
            {animes.length ? (
              <div></div>
            ) : (
              <div>
                <p>Aucun résultat</p>
              </div>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default SearchBar;
