import Card, { CardBody } from "../layouts/Card";
import { FaTimes } from "react-icons/fa";
import moment from "../../helpers/moment";

const AdminAnime = ({ anime, onDelete }) => {
  return (
    <Card className="my-2 border w-full">
      <CardBody className="relative p-2">
        <div className="flex text-justify">
          <div className="w-1/4">
            <img
              style={{ maxHeight: "200px" }}
              src={anime.posterImage.small}
              alt="poster"
              className="cursor-pointer"
              onClick={() => {
                window.open(`https://kitsu.io/anime/${anime.slug}`);
              }}
            />
          </div>
          <div className="w-3/4">
            <div className="w-full text-lg mb-1">
              Titre : {anime.canonicalTitle}
            </div>
            <div className="flex w-full">
              <ul className="w-1/2">
                <li>Type : {anime.showType}</li>
                <li>Episodes : {anime.episodeCount}</li>
                <li>Rank : #{anime.ratingRank}</li>
                <li>Popularity : #{anime.popularityRank}</li>
                <li>Rating : {anime.averageRating}%</li>
                <li>Utilisateur : {anime.userCount}</li>
              </ul>
              <ul className="w-1/2">
                <li>ID: {anime.id}</li>
                <li>Status : {anime.status}</li>
                <li>Saison : {anime.season}</li>
                <li>Début : {moment(anime.startDate).format("ll")}</li>
                <li>Fin : {moment(anime.endDate).format("ll")}</li>
                <li>Studio : </li>
              </ul>
            </div>
          </div>
        </div>

        <i
          onClick={() => onDelete(anime.id)}
          className="absolute top-3 right-3 text-danger cursor-pointer"
        >
          <FaTimes className="text-2xl hover:text-4xl" />
        </i>
      </CardBody>
    </Card>
  );
};

export default AdminAnime;
