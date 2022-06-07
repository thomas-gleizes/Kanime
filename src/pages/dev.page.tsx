import React, { useEffect, useState } from 'react';

import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import { ApiService } from 'services/api.service';

const DevPage = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    ApiService.get('/users/1/entries', {
      params: {
        include: { anime: true },
      },
    })
      .then(console.log)
      .catch(console.error);
  }, []);

  return <div className="p-10 space-y-1"></div>;
};

DevPage.layout = EmptyLayout;

export default DevPage;

class PromiseD {}
