import { animeModel } from 'models'
import AnimeSide from 'components/common/anime/AnimeSide'
import React from 'react'
import { animesMapper } from 'mappers'

interface Props {
  params: {
    slug: string
  }
}

export default async function AnimePage({ params }: Props) {
  const anime = await animeModel.findBySlug(params.slug).then((anime) => animesMapper.one(anime))

  return (
    <div className="w-full flex h-screen">
      <AnimeSide anime={anime} />
      <div className="w-2/3 px-3 mt-4">
        <div className="flex flex-col space-y-2">
          <div>
            <h2 className="text-3xl text-gray-700 font-semibold inline">
              {anime.titles?.en_jp || anime.canonicalTitle}
            </h2>
            <span className="text-gray-500 text-lg ml-2 inline font-black">
              {anime.season_year}
            </span>
          </div>
          <div className="text-amber-500 font-semibold text-md">
            <span>Approuvé à {anime.rating.average}% par la communauté</span>
          </div>
          {anime.description && (
            <div>
              <p className="text-ellipsis overflow-hidden text-gray-800 mb-4 prose">
                {anime.description}
                {/*{extendParagraph && anime.description?.length > DESCRIPTION_LENGTH*/}
                {/*  ? anime.description.split('').splice(0, DESCRIPTION_LENGTH).join('') + ' ...'*/}
                {/*  : anime?.description}*/}
              </p>
              {/*{anime.description.length > DESCRIPTION_LENGTH && (*/}
              {/*  <div*/}
              {/*    className="text-lg text-orange-500 cursor-pointer text-center w-full"*/}
              {/*    onClick={toggleParagraph}*/}
              {/*  >*/}
              {/*    <span>read {extendParagraph ? 'more' : 'less'}</span>*/}
              {/*  </div>*/}
              {/*)}*/}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}