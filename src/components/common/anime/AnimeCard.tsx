'use client'

import React, { useRef } from 'react'
import Link from 'next/link'

import { useMouseOvered } from 'hooks'
import { routes } from 'resources/routes'
import AnimePopup from 'components/common/anime/AnimePopup'

interface Props {
  anime: Anime
  popupPosition: 'none' | 'left' | 'right'
}

const AnimeCard: Component<Props> = ({ anime, popupPosition }) => {
  const { slug, poster, canonicalTitle } = anime

  const ref = useRef<HTMLDivElement>(null)

  const isMouseOver = useMouseOvered(ref)

  return (
    <div className="relative w-full mx-auto">
      <div ref={ref} className="bg-primary shadow hover:shadow-lg cursor-pointer rounded">
        <Link href={`${routes.animes.list}/${slug}`}>
          <div className="flex justify-center">
            {poster?.small ? (
              <img
                src={poster.small}
                width={250}
                height={340}
                alt={canonicalTitle}
                className="mx-auto rounded-t"
              />
            ) : (
              <div className="bg-primary-dark" />
            )}
          </div>
          <h3 className="text-center text-white font-bold py-1 truncate max-w-full px-2">
            {canonicalTitle}
          </h3>
        </Link>
      </div>
      {popupPosition !== 'none' && (
        <AnimePopup anime={anime} isOpen={isMouseOver} position={popupPosition} />
      )}
    </div>
  )
}

export default AnimeCard
