import HighRatingAnimes from 'components/landing/HighRatingAnimes'
import PopularAnimes from 'components/landing/PopularAnimes'
import { animeModel } from 'models'
import { animesMapper } from 'mappers'

export default async function HomePage() {
  const [rated, popular] = await Promise.all([animeModel.findHighRated(), animeModel.findPopular()])

  return (
    <div className="flex flex-col-2 items-center justify-center h-[80vh] py-2">
      <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-center">{Date.now()}</div>
        <h1 className="text-6xl font-bold first-letter:text-[#db8000]">
          Bienvenue sur{' '}
          <span className="text-sky-500 font-gang-of-three">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </h1>

        <p className="mt-3 text-2xl">
          Cherché tous vos <strong>animes</strong>
        </p>

        <div className="flex flex-col space-y-3 h-40 w-full">
          <HighRatingAnimes animes={animesMapper.many(rated)} />
          <PopularAnimes animes={animesMapper.many(popular)} />
        </div>
      </div>
    </div>
  )
}
