import { FaStar } from 'react-icons/fa';

interface Props {
  entry: Entry;
}

const AnimesEntry: Component<Props> = ({ entry }) => {
  return (
    <div>
      <div className="bg-primary rounded shadow">
        <img
          src={entry.anime.poster.small as string}
          className="w-44"
          alt={entry.anime.canonicalTitle}
        />
        <div className="h-0.5 bg-primary-dark">
          <div
            className="bg-primary-light h-full"
            style={{ width: `${(entry.progress / entry.anime.episode.count) * 100}%` }}
          />
        </div>
        <div className="h-7 bg-primary">
          <div className="flex justify-between items-center mx-2 h-full text-white text-sm">
            <span>Ep. {entry.progress || '0'}</span>
            {entry.rating ? (
              <span className="flex items-center">
                <FaStar className="text-yellow-400 text-lg mr-2" /> {entry.rating}
              </span>
            ) : (
              <span className="text-opacity-50">pas note</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimesEntry;
