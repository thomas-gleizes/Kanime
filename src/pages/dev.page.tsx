import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';

import { useToggle } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';

const DevPage = () => {
  const [dep, toggleDep] = useToggle();
  const [json, setJson] = useState<any>();

  useEffect(() => {
    axios
      .get('/api/animes', { params: { limit: 5, includes: ['entries', 'saga'] } })
      .then((response) => setJson(response.data.animes))
      .catch((err) => console.log('err', err));
  }, [dep]);

  useEffect(() => {
    const interval = setInterval(toggleDep, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => console.log('Json', json), [json]);

  return (
    <div className="p-10">
      <Button onClick={toggleDep}>Trigger</Button>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
