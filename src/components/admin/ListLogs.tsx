import React, { useEffect, useState } from 'react';

import { Logs } from '@types';
import appAxios from '@lib/api/appAxios';
import Moment from '@helpers/momentFr';

const fetchLogs = (limit: number, start: number) =>
  appAxios.get('logs', { params: { limit, start } });

const ListLogs = () => {
  const [logs, setLogs] = useState<Logs>([]);

  useEffect(() => {
    fetchLogs(1000, 0).then((response) => setLogs(response.data.logs));
  }, []);

  return (
    <table className="custom-table">
      <thead>
        <tr className="bg-gray-800">
          <th />
          <th>Method</th>
          <th>Route</th>
          <th>Ip</th>
          <th>Il y a</th>
          <th>Authentifié</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.method}</td>
            <td>{log.route}</td>
            <td>{log.ip}</td>
            <td>{Moment(log.createAt).fromNow()}</td>
            <td>{log.authToken ? 'Oui' : 'Non'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLogs;
