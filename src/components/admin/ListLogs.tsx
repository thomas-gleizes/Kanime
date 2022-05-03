import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ApiService } from 'services/api.service';
import { useClockFromDate } from 'hooks';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';

interface TimeCellProps {
  date: Date | string;
}

const TimeCell: Component<TimeCellProps> = ({ date }) => {
  const time = useClockFromDate(new Date(date));

  return <>{time}</>;
};

const fetchLogs = (limit: number, start: number) =>
  ApiService.get<any, { logs: Logs }>(routes.logs.api.list, { params: { limit, start } });

const ListLogs: Component = () => {
  const [logs, setLogs] = useState<Logs>([]);

  useEffect(() => {
    fetchLogs(20, 0)
      .then((data) => setLogs(data.logs))
      .catch((error) => toast(error.message, 'error'));
  }, []);

  return (
    <div className="card">
      <DataTable value={logs} header="Logs" size="small" responsiveLayout="scroll">
        <Column field="createAt" header="Date" />
        <Column field="path" header="Path" />
        <Column field="method" header="Method" />
        <Column field="ip" header="Host" />
        <Column field="user.username" header="User" />
      </DataTable>
    </div>
  );
};

export default ListLogs;
