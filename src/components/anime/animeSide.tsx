import React from 'react';

const Item = ({ label, content }) => (
  <li className="text-sm">
    <strong>{label} : </strong>
    <span>{content}</span>
  </li>
);

const AnimeSide = ({ anime }) => {
  return (
    <div className="w-1/3 h-100">
      <div className="bg-white border shadow p-2 ">
        <h2 className="text-md font-medium mb-2">Details de l'anime</h2>
        <ul>
          <Item label="Anglais" content={anime.titles.en} />
          <Item label="Japonais" content={anime.titles.en_jp} />
          <Item label="Japonais (Romaji)" content={anime.titles.ja_jp} />
        </ul>
      </div>
    </div>
  );
};

export default AnimeSide;
