import React, { useEffect } from 'react';
import useSWR, { SWRConfig } from 'swr';

const DevPage = ({ ...props }) => {
  const { data } = useSWR('/api/animes/2');

  useEffect(() => console.log('Data', data), [data]);

  return <></>;
};

DevPage.layout = ({ children }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => {
          console.log('Resource', resource);
          console.log('Init', init);

          return fetch(resource, init).then((res) => res.json());
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default DevPage;
