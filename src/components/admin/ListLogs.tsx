import React, { useEffect, useState } from 'react';

import { ApiService } from 'services/api.service';
import { useClockFromDate } from 'hooks';
import { routes } from 'ressources/routes';
import toast from 'utils/toastr';

const fetchLogs = (limit: number, start: number) =>
  ApiService.get(routes.logs.api.list, { params: { limit, start } });

interface TimeCellProps {
  date: Date | string;
}

const TimeCell: Component<TimeCellProps> = ({ date }) => {
  const time = useClockFromDate(new Date(date));

  return <>{time}</>;
};

const ListLogs: Component = () => {
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
          <th>Utilisateur</th>
          <th>Il y a</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <tr key={log.id}>
            <td>{log.id}</td>
            <td>{log.method}</td>
            <td>{log.route}</td>
            <td>{log.ip}</td>
            <td>{log.user?.id}</td>
            <td>
              <TimeCell date={log.createAt} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListLogs;
