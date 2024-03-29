import React from 'react'

import { Page } from 'app/next'
import { ssrHandler } from 'services/handler.service'
import { animeModel, sagaModel } from 'models'
import { animesMapper, sagasMapper } from 'mappers'
import { SsrException } from 'exceptions'
import { errorMessage } from 'resources/constants'
import AnimeLayout from 'components/layouts/pages/AnimeLayout'

interface Props {
  anime: Anime
  saga: Nullable<Saga>
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(async ({ params }) => {
  const anime = await animeModel.findBySlug(params?.slug as string)

  if (!anime) throw new SsrException(404, errorMessage.ANIME_NOT_FOUND)

  const saga = await sagaModel.findById(anime.sagaId)

  return {
    props: {
      anime: animesMapper.one(anime),
      saga: saga ? sagasMapper.one(saga) : null
    }
  }
})

const SagaPage: Page<Props> = ({ saga, anime }) => {
  return (
    <div>
      <h1 className="text-xl font-black text-center">Saga</h1>
      {saga ? (
        <div className="bg-gray-50 px-5 mt-3">
          <div className="flex flex-col space-y-2">
            {saga.animes &&
              saga.animes
                .filter((a) => a.id !== anime.id)
                .map((anime, index) => (
                  <div key={index} className="bg-white shadow border rounded-xl px-3 py-2 w-full">
                    <div className="flex">
                      {anime.poster && (
                        <img
                          className="rounded-lg"
                          src={anime.poster.small as string}
                          width={158}
                          height={224}
                          alt={anime.slug}
                        />
                      )}
                      <div className="w-full">
                        <div>
                          <h2 className="text-center text-lg font-extrabold">
                            {anime.canonicalTitle}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-center text-lg">L&apos;animée n&apos;est pas dans une saga</h2>
        </div>
      )}
    </div>
  )
}

SagaPage.layout = AnimeLayout

export default SagaPage
