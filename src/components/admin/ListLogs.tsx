import React, { useEffect, useState } from 'react';
import Card, { CardBody } from '@layouts/Card';
import appAxios from '@lib/api/appAxios';

const fetchLogs = (limit: number, start: number) =>
  appAxios.get('logs', { params: { limit, start } });

const ListLogs = () => {
  const [logs, setLogs] = useState<Array<any>>();

  useEffect(() => {
    fetchLogs(20, 0).then((response) => {
      console.log('Response.data', response.data);

      setLogs(response.data.logs);
    });
  }, []);

  return (
    <Card>
      <CardBody>
        <table className="table-auto">
          <thead>
            <tr>
              <th>Date</th>
              <th>Id</th>
              <th>Path</th>
              <th>Method</th>
              <th>Ip</th>
              <th>Token</th>
            </tr>
          </thead>
        </table>
      </CardBody>
    </Card>
  );
};

export default ListLogs;
