'use client'

import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { animesApi } from 'api'
import { useDelayBoolean, useScrollPercent } from 'hooks'
import AnimeCard from 'components/common/anime/AnimeCard'

interface Props {
  animes: Animes
}

const fetchAnimes = ({ pageParam = 0 }) =>
  animesApi.show({ limit: 40, skip: pageParam * 40 }).then((response) => response.records)
export default function AnimesList({ animes }: Props) {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<Animes>(['animes'], fetchAnimes, {
    getNextPageParam: (_, pages) => pages.length,
    initialData: {
      pageParams: [0],
      pages: [animes]
    },
    suspense: true
  })

  const [active, toggle] = useDelayBoolean(5000)
  const percent = useScrollPercent({ sensitive: 3 })

  // useEffect(() => {
  //   if (!active && percent > 95 && !isLoading) {
  //     toggle()
  //     void fetchNextPage()
  //   }
  // }, [active, percent])

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-5">
      {data.pages.flat().map((anime, index) => (
        <AnimeCard key={index} anime={anime} popupPosition={'left'} />
      ))}
    </div>
  )
}
