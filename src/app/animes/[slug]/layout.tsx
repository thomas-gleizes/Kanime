import React from 'react'
import Image from 'next/image'

import { routes } from 'resources/routes'
import { animeModel } from 'models'
import { animesMapper } from 'mappers'
import KitsuButton from 'components/common/KitsuButton'
import AnimeNavLink from 'components/common/anime/AnimeNavLink'
import { POSTER_RAPPORT } from 'resources/constants'
import { notFound } from 'next/navigation'

interface Props {
  children: ReactNode
  params: {
    slug: string
  }
}

type tab = { label: string; path: string }

const TABS: Array<tab> = [
  { label: 'Résumé', path: '' },
  { label: 'Catégories', path: '/categories' },
  { label: 'Discussions', path: '/discussions' },
  { label: 'Saga', path: '/saga' },
  { label: 'Episodes', path: '/episodes' },
  { label: 'Personnages', path: '/characters' }
]

export default async function AnimeLayout({ children, params }: Props) {
  const anime = await animeModel.findBySlug(params.slug).then((anime) => animesMapper.one(anime))

  if (!anime) notFound()

  return (
    <div className="relative -top-header">
      <div className="flex flex-col justify-between">
        <div className="w-full h-[450px]">
          <div className="fixed -z-10 w-full h-[450px] bg-primary-dark">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${anime.cover?.small}')` }}
            >
              <div className="w-full h-full bg-black bg-opacity-40" />
            </div>
          </div>
        </div>
        <div>
          <nav className="relative bg-white p-0 w-full">
            <div className="flex justify-center divide-x-2 divide-gray-200">
              {TABS.map((tab, index) => (
                <AnimeNavLink key={index} href={`${routes.animes.list}/${anime.slug}${tab.path}`}>
                  {tab.label}
                </AnimeNavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>
      <div className="w-full bg-gray-50 z-70">
        <div className="mx-auto w-full max-w-[1150px]">
          <div className="sticky float-right w-200 top-[250px]">
            <div className="relative w-[214px] top-[-150px]">
              <div className="w-full shadow h-[304px] rounded-md bg-kitsu mb-2">
                {anime.poster?.medium && (
                  <Image
                    className="rounded-md"
                    src={anime.poster.medium}
                    alt={`poster ${anime.canonicalTitle}`}
                    width={214}
                    height={214 * POSTER_RAPPORT}
                  />
                )}
              </div>
              <div className="w-full">
                <div className="flex flex-col space-y-2">
                  <div>
                    <KitsuButton slug={anime.slug} />
                  </div>
                  <div>
                    {/*<Menu label="Modifier l'entrée">*/}
                    {/*{!entry && (*/}
                    {/*  <MenuGroup>*/}
                    {/*    <MenuItem*/}
                    {/*      onClick={() => handleSetupEntry('Completed')}*/}
                    {/*      icon={<CheckCircleIcon className="h-5 w-5" />}*/}
                    {/*    >*/}
                    {/*      Terminée*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem*/}
                    {/*      onClick={() => handleSetupEntry('Wanted')}*/}
                    {/*      icon={<EyeIcon className="h-5 w-5" />}*/}
                    {/*    >*/}
                    {/*      A voir*/}
                    {/*    </MenuItem>*/}
                    {/*    <MenuItem*/}
                    {/*      onClick={() => handleSetupEntry('Watching')}*/}
                    {/*      icon={<PlayIcon className="h-5 w-5" />}*/}
                    {/*    >*/}
                    {/*      A Commencé*/}
                    {/*    </MenuItem>*/}
                    {/*  </MenuGroup>*/}
                    {/*)}*/}
                    {/*<MenuGroup>*/}
                    {/*  <MenuItem*/}
                    {/*    onClick={handleModal}*/}
                    {/*    icon={<PencilAltIcon className="h-5 w-5" />}*/}
                    {/*  >*/}
                    {/*    Edit*/}
                    {/*  </MenuItem>*/}
                    {/*</MenuGroup>*/}
                    {/*</Menu>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mr-[210px]">
            <div className="w-full py-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
