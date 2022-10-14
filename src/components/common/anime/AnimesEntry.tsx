import React from 'react';
import Link from 'next/link';
import { FaEye, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { useDialog, useHovered } from 'hooks';
import AnimePopup from 'components/common/anime/AnimePopup';
import EditAnimesEntries, {
  Props as EditAnimesEntriesProps,
  Result as EditAnimesEntriesResult,
} from 'components/modal/EditAnimesEntries';

interface Props {
  entry: Entry;
  editable: boolean;
  updateList: (action: 'delete' | 'update', entry: Entry) => void;
}

const AnimesEntry: Component<Props> = ({ entry, editable, updateList }) => {
  const [ref, isHover] = useHovered<HTMLDivElement>();

  const dialog = useDialog();

  const handleEntry = async () => {
    const result = await dialog<EditAnimesEntriesProps, EditAnimesEntriesResult>(
      EditAnimesEntries,
      { entry, anime: entry.anime as Anime }
    );

    switch (result.action) {
      case 'submit':
        updateList('update', result.values);
        return void toast.success('Entry updated successfully');
      case 'delete':
        updateList('delete', entry);
        return void toast.success('Entry deleted successfully');
      case 'cancel':
    }
  };

  return (
    <div className="relative h-auto">
      <div ref={ref} className="bg-primary shadow">
        <div className="relative">
          {entry.anime && (
            <img
              className="h-auto"
              src={entry.anime.poster?.small as string}
              alt={entry.anime.canonicalTitle}
            />
          )}
          {editable && isHover ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-70 transition duration-100">
              <div className="h-1/4 flex flex-col space-y-2 absolute px-3 w-full bottom-0">
                <div className="w-full">
                  <div className="border border-white rounded w-full cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100">
                    <p className="text-white text-sm text-center select-none">
                      Ajouter un reaction
                    </p>
                  </div>
                </div>
                <div className="w-full flex">
                  <div
                    className="border border-white rounded w-full cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100"
                    onClick={handleEntry}
                  >
                    <p className="text-white text-sm text-center select-none">
                      Modifier {"l'entrée"}
                    </p>
                  </div>
                  <div className="border border-white rounded px-1 py-0.5 ml-2 cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100">
                    {entry.anime && (
                      <Link href={`/animes/${entry.anime.slug}`}>
                        <FaEye className="h-4 w-4 text-white" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="h-0.5 bg-primary-dark">
          {entry.anime?.episode && entry.progress ? (
            <div
              className="bg-primary-light h-full"
              style={{
                width: `${
                  (entry.progress / (entry.anime.episode.count || entry.progress)) * 100
                }%`,
              }}
            />
          ) : null}
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
      {entry.anime && (
        <AnimePopup anime={entry.anime} isOpen={isHover} position="right" />
      )}
    </div>
  );
};

export default AnimesEntry;
