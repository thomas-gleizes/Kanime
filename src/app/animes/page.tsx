import React from 'react'

import { animeModel } from 'models'
import { animesMapper } from 'mappers'
import AnimesList from 'components/common/anime/AnimesList'

export default async function AnimesPages() {
  const animes = await animeModel.all()

  return (
    <div className="py-10">
      <div className="max-w-1100 mx-auto w-11/12 mb-400">
        <AnimesList animes={animesMapper.many(animes)} />
      </div>
    </div>
  )
}
