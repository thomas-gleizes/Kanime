import React, { ChangeEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'
import SimpleBar from 'simplebar-react'
import classnames from 'classnames'
import { toast } from 'react-toastify'
import { FaSearch } from 'react-icons/fa'
import { BiLoaderCircle } from 'react-icons/bi'

import { animesApi } from 'api'
import { useKeyPress } from 'hooks'
import { routes } from 'resources/routes'
import timeout from 'utils/timeout'
import StarsRating from 'components/common/StarsRating'

interface Props {
  transparent: boolean
}

const SearchBar: Component<Props> = ({ transparent }) => {
  const [query, setQuery] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [animes, setAnimes] = useState<Animes>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [iSelected, setISelected] = useState<number>(0)

  const router = useRouter()

  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')
  const enterPress = useKeyPress('Enter')

  useEffect(() => {
    if (arrowDown && iSelected < animes.length) setISelected(iSelected + 1)
  }, [arrowDown])

  useEffect(() => {
    if (arrowUp && iSelected > 0) setISelected(iSelected - 1)
  }, [arrowUp])

  useEffect(() => {
    if (enterPress && open && animes[iSelected])
      router.push(`/animes/${animes[iSelected]?.slug}`).then(() => setOpen(false))
  }, [enterPress])

  const handleChangeQuery = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value)
    setOpen(true)
    setISelected(0)

    if (target.value.length > 3) {
      setLoading(true)

      const animesPromises = animesApi
        .search(target.value, { limit: 50, skip: 0 })
        .then((response) => setAnimes(response.animes))
        .catch((e) => toast.error(e.error || 'Une erreur est survenue'))

      Promise.all([animesPromises]).finally(() => setLoading(false))
    } else {
      setAnimes([])
    }
  }

  return (
    <div
      className="relative w-full py-1"
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <div
        className={classnames(
          'w-full h-[30px] md:h-[25px] my-auto rounded transition duration-300 ease-in-out',
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
      <div className="absolute top-[45px] w-full mx-auto">
        <Transition
          show={open}
          enter="transition ease-out duration-200 z-90"
          enterFrom="transform opacity-0 scale-0"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-0"
        >
          <div className="w-full bg-gray-50 backdrop-blur rounded border border-gray-300 shadow-xl">
            <div className="flex items-center justify-between px-3 py-1 bg-primary rounded-t text-white">
              <h3 className="text-center text-xl">Animes</h3>
              {loading && (
                <i>
                  <BiLoaderCircle className="animate-spin text-lg" />
                </i>
              )}
            </div>
            <SimpleBar className="max-h-[60vh]">
              <div className="w-full">
                {animes?.length ? (
                  <div onClick={timeout(() => setOpen(false), 10)}>
                    {animes.map((anime, index) => (
                      <Link key={anime.id} href={routes.animes.anime(anime.slug)}>
                        <div
                          id={`anime-search-${anime.id}`}
                          className={classnames(
                            'my-0.5 py-1.5 px-3 bg-white hover:bg-gray-200 cursor-pointer',
                            { 'bg-gray-200': index === iSelected }
                          )}
                        >
                          <div className="flex justify-between space-x-2">
                            <div className="flex flex-col justify-between w-full">
                              <div>
                                <h6 className="text-slate-900">
                                  {anime.canonicalTitle}{' '}
                                  <span className="text-sm font-light text-slate-600">
                                    ({anime.type})
                                  </span>
                                </h6>
                              </div>
                              <div className="flex justify-between">
                                <span>{anime.season_year}</span>
                                <span>
                                  {anime.rating.average && (
                                    <StarsRating
                                      rating={Math.round(anime.rating.average / 20)}
                                    />
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="w-[14%]">
                              <img src={anime.poster?.tiny} className="w-full rounded" />
                            </div>
                          </div>
                        </div>
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
  )
}

export default SearchBar
