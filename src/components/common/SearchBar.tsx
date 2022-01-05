import React from 'react';

const SearchBar: React.FunctionComponent = () => {
  return (
    <input
      type="search"
      className="w-2/3 px-5 bg-gray-300 rounded bg-opacity-20 hover:bg-opacity-40 focus:bg-opacity-60"
    />
  );
};

export default SearchBar;
