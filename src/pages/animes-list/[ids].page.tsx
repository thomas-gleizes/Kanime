import { Page } from 'app/next'
import { ssrHandler } from 'services/handler.service'
import { animesMapper } from 'mappers'
import { animeModel } from 'models'
import { SsrException } from 'exceptions'
import AnimeCard from 'components/common/anime/AnimeCard'

interface Props {
  animes: Animes
}

export const getServerSideProps = ssrHandler<Props>(async (context) => {
  const queryIds = context.query.ids as string
  const ids = queryIds.split(',')

  const animes = animesMapper.many(await animeModel.findByIds(ids.map(Number)))

  if (animes.length === 0) {
    throw new SsrException(404, 'Anime not found')
  }

  return { props: { animes } }
})

const AnimesList: Page<Props> = ({ animes }) => {
  return (
    <div className="grid grid-cols-4 w-1000 mx-auto">
      {animes?.map((anime, index) => (
        <div key={index}>
          <AnimeCard anime={anime} popupPosition="left" />
        </div>
      ))}
    </div>
  )
}

export default AnimesList
// 16256,15779,15846,15656,16115,15197,10819,7269,13227,11766,7322,7533,11640,7155,12185,2850,179,767,13612
