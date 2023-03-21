import AnimeCard from 'components/common/anime/AnimeCard'

interface Props {
  animes: Animes
}

const PopularAnimes: Component<Props> = ({ animes }) => {
  return (
    <div className="h-56 max-w-[90%] mx-auto">
      <div className="flex space-x-3 overflow-x-auto">
        {animes.map((anime) => (
          <div key={anime.id} className="h-48 w-24 bg-blue-700">
            <AnimeCard anime={anime} popupPosition="none" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularAnimes
