import React from 'react';

import { Page } from 'app/next';

import { animesApi } from 'api';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import { useHideHeader } from 'hooks';

const DevPage: Page = () => {
  useHideHeader();

  const handleClick = async () => {
    await animesApi.search('naruto');
    await animesApi.search('naruto');
  };

  return (
    <div className="p-10">
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
