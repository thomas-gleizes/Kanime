import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';

import { AnimesApi } from 'api';
import { useKeyPress } from 'hooks';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import timeout from 'utils/timeout';
import { Spinner } from '@chakra-ui/react';

interface Props {
  transparent: boolean;
}

const SearchBar: Component<Props> = ({ transparent }) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Animes>([]);
  const [users, setUsers] = useState<Users>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [iSelected, setISelected] = useState<number>(0);

  const router = useRouter();

  const arrowUp = useKeyPress('ArrowUp');
  const arrowDown = useKeyPress('ArrowDown');
  const enterPress = useKeyPress('Enter');

  useEffect(() => {
    if (arrowDown && iSelected < animes.length) setISelected(iSelected + 1);
  }, [arrowDown]);

  useEffect(() => {
    if (arrowUp && iSelected > 0) setISelected(iSelected - 1);
  }, [arrowUp]);

  useEffect(() => {
    if (enterPress && open) {
      router.push(`/animes/${animes[iSelected].slug}`).then(() => setOpen(false));
    }
  }, [enterPress]);

  const handleChangeQuery = ({ target: { value } }) => {
    setQuery(value);
    setOpen(true);
    setISelected(0);

    if (value.length > 3) {
      setLoading(true);

      const animesPromises = AnimesApi.search(value, { limit: 50, skip: 0 })
        .then((response) => setAnimes(response.animes))
        .catch((e) => toast(e.error, 'error'));

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
      <div
        className={classnames(
          'flex w-full h-[35px] px-3 rounded duration-500 ease-in-out transition-all items-center',
          {
            'bg-opacity-30 bg-black': transparent,
            'bg-primary-dark bg-opacity-100': !transparent,
          }
        )}
      >
        <input
          type="search"
          value={query}
          onChange={handleChangeQuery}
          className="bg-transparent text-gray-100 w-full h-full my-auto"
        />
      </div>
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
                <div className="flex items-center justify-center space-x-3 py-1 bg-primary rounded-t text-white">
                  <h3 className="text-center text-xl">Animes</h3>
                  <Spinner
                    thickness="4px"
                    color="red.300"
                    className={classnames({ invisible: !loading })}
                  />
                </div>
                {animes?.length ? (
                  <div onClick={timeout(() => setOpen(false), 10)}>
                    {animes.map((anime, index) => (
                      <Link key={anime.id} href={routes.animes.anime(anime.slug)}>
                        <a>
                          <div
                            id={`anime-search-${anime.id}`}
                            className={classnames(
                              'my-0.5 py-1.5 px-3 bg-white hover:bg-gray-200 cursor-pointer',
                              { 'bg-gray-200': index === iSelected }
                            )}
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
