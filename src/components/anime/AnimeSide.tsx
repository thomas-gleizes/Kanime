import React from 'react';
import { Anime } from '@types';

interface Props {
  anime: Anime;
}

interface ItemProps {
  label: string;
  content: string;
}

const AnimeSide: React.FunctionComponent<Props> = ({ anime }) => {
  return (
    <div className="w-1/3 h-100">
      <div className="bg-white border shadow px-4 py-8">
        <h2 className="font-semibold mb-2">Details de {"l'anime"}</h2>
        <ul className="space-y-2 text-sm">
          <Item label="Anglais" content={anime.titles.en} />
          <Item label="Japonais" content={anime.titles.en_jp} />
          <Item label="Japonais (Romaji)" content={anime.titles.ja_jp} />
          <Item label="Type" content={anime.type} />
          <Item label="Episodes" content={anime.episode.count.toString()} />
          <Item label="Durée" content={`${anime.episode.length.toString()} minutes`} />
          <Item label="Status" content={anime.status} />
        </ul>
      </div>
    </div>
  );
};

const Item: React.FunctionComponent<ItemProps> = ({ label, content }) => (
  <li className="text-sm">
    <strong>{label} : </strong>
    <span>{content}</span>
  </li>
);

export default AnimeSide;
