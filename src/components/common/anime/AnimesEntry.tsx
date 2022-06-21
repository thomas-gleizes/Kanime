import React from 'react';
import Link from 'next/link';
import { FaEye, FaStar } from 'react-icons/fa';

import { useDialog, useHovered } from 'hooks';
import EditAnimesEntries, {
  Props as EditAnimesEntriesProps,
  Result as EditAnimesEntriesResult,
} from 'components/modal/EditAnimesEntries';
import { ApiService } from 'services/api.service';

interface Props {
  entry: Entry;
  editable: boolean;
}

const AnimesEntry: Component<Props> = ({ entry, editable }) => {
  const [ref, isHover] = useHovered<HTMLDivElement>();

  const dialog = useDialog();

  const handleEntry = async () => {
    const result = await dialog.custom<EditAnimesEntriesResult, EditAnimesEntriesProps>(
      EditAnimesEntries,
      { entry, anime: entry.anime }
    );

    if (result?.action === 'submit') {
      const response = await ApiService.post<{ entry: Entry }>(
        `/animes/${entry.anime.id}/entries`,
        result.values
      );

      // @ts-ignore
      setEntry(response.entry);
    } else if (result?.action === 'delete') {
      await ApiService.delete(`/animes/${entry.anime.id}/entries`);
    }
  };

  return (
    <div>
      <div className="bg-primary shadow">
        <div className="relative" ref={ref}>
          <img
            src={entry.anime.poster.small as string}
            className="w-44"
            alt={entry.anime.canonicalTitle}
          />
          {editable && isHover ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-0 hover:bg-opacity-70 transition duration-100">
              <div className="h-1/4 flex flex-col space-y-2 absolute px-3 w-full bottom-0">
                <div className="w-full">
                  <div className="border border-white rounded w-full cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100">
                    <p className="text-white text-sm">Ajouter un reaction</p>
                  </div>
                </div>
                <div className="w-full flex">
                  <div
                    className="border border-white rounded w-full cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100"
                    onClick={handleEntry}
                  >
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <p className="text-white text-sm">Modifier l'entrée</p>
                  </div>
                  <div className="border border-white rounded px-1 py-0.5 ml-2 cursor-pointer hover:bg-white hover:bg-opacity-30 transition duration-100">
                    <Link href={`/animes/${entry.anime.slug}`}>
                      <FaEye className="h-4 w-4 text-white" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>

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
