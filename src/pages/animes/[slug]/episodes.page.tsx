import React from 'react'

import { Page } from 'app/next'
import { ssrHandler } from 'services/handler.service'
import { animesMapper } from 'mappers'
import { animeModel } from 'models'
import { SsrException } from 'exceptions'
import { errorMessage } from 'resources/constants'
import AnimeLayout from 'components/layouts/pages/AnimeLayout'

interface Props {
  anime: Anime
}

export const getServerSideProps = ssrHandler<Props, { slug: string }>(
  async ({ params }) => {
    const anime = await animeModel.findBySlug(params?.slug as string)

    if (!anime) throw new SsrException(404, errorMessage.ANIME_NOT_FOUND)

    return { props: { anime: animesMapper.one(anime) } }
  }
)

const SagaPage: Page<Props> = (props) => {
  return <h1 className="text-xl font-black text-center">Episodes</h1>
}

SagaPage.layout = AnimeLayout

export default SagaPage
