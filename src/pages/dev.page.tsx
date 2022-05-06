import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { useToggle } from 'hooks';
import EmptyLayout from 'components/layouts/pages/EmptyLayout';
import ReactJson from 'react-json-view';

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

  return (
    <div className="p-10">
      <Button onClick={toggleDep}>Trigger</Button>
      <div className="border p-2 m-3">{json && <ReactJson src={json}></ReactJson>}</div>
    </div>
  );
};

DevPage.layout = EmptyLayout;

export default DevPage;
