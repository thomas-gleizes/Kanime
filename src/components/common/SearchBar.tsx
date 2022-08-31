import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import SimpleBar from 'simplebar-react';
import classnames from 'classnames';
import { Spinner } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';

import { AnimesApi } from 'api';
import { useKeyPress } from 'hooks';
import { routes } from 'resources/routes';
import timeout from 'utils/timeout';

interface Props {
  transparent: boolean;
}

const SearchBar: Component<Props> = ({ transparent }) => {
  const [query, setQuery] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [animes, setAnimes] = useState<Animes>([]);
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
        .catch((e) => toast.error(e.error || 'Une erreur est survenue'));

      Promise.all([animesPromises]).finally(() => setLoading(false));
    } else {
      setAnimes([]);
    }
  };

  return (
    <div
      className="relative w-full py-1"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div
        className={classnames(
          'w-full h-[30px] md:h-[25px] my-auto rounded duration-500 ease-in-out transition-all',
          transparent ? 'bg-opacity-20 bg-black' : 'bg-primary-dark bg-opacity-100'
        )}
      >
        <span className="text-sm text-white text-opacity-80 flex items-center space-x-2 mx-3 h-full">
          <i className="font-light">
            <FaSearch />
          </i>
          <input
            type="search"
            value={query}
            onChange={handleChangeQuery}
            className="bg-transparent text-gray-100 w-full"
            placeholder="Recherché sur K'anime"
          />
        </span>
      </div>
      <div className="absolute top-[45px] w-[96%] mx-auto z-100">
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
