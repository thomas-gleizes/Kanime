import React, { useEffect, useState } from 'react';

import { Logs } from '@types';
import appAxios from '@lib/api/appAxios';
import toast from '@helpers/toastr';
import useClockFromDate from '../../hooks/useClockFromDate';

const fetchLogs = (limit: number, start: number) =>
  appAxios.get('logs', { params: { limit, start } });

interface TimeCellProps {
  date: Date | string;
}

const TimeCell: React.FunctionComponent<TimeCellProps> = ({ date }) => {
  const time = useClockFromDate(new Date(date));

  return <>{time}</>;
};

const ListLogs: React.FunctionComponent = () => {
  const [logs, setLogs] = useState<Logs>([]);

  useEffect(() => {
    fetchLogs(20, 0)
      .then((response) => setLogs(response.data.logs))
      .catch((error) => toast(error.message, 'error'));
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
            <td>
              <TimeCell date={log.createAt} />
            </td>
            <td>{log.authToken ? 'Oui' : 'Non'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLogs;