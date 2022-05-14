import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { ApiService } from 'services/api.service';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import { useToggle } from 'hooks';
import { Button } from 'primereact/button';

const fetchLogs = (limit: number, start: number) =>
  ApiService.get<any, { logs: Logs }>(routes.logs.api.list, { params: { limit, start } });

const ListLogs: Component = () => {
  const [logs, setLogs] = useState<Logs>([]);
  const [dep, toggleDep] = useToggle();

  useEffect(() => {
    fetchLogs(20, 0)
      .then((data) => setLogs(data.logs))
      .catch((error) => toast(error.message, 'error'));
  }, [dep]);

  const Header: Component<any> = ({ props }) => (
    <div className="w-full flex justify-between">
      <span className="my-auto">
        <h1 className="font-bold">Logs</h1>
      </span>
      <Button onClick={toggleDep} className="p-button-sm" icon="pi pi-sync" />
    </div>
  );

  return (
    <div className="shadow">
      <DataTable value={logs} header={Header} size="small" responsiveLayout="scroll">
        <Column field="createAt" header="Date" body={CellDateTime('createAt')} />
        <Column field="path" header="Path" />
        <Column field="method" header="Method" />
        <Column field="ip" header="Host" />
        <Column field="user.username" header="User" />
      </DataTable>
    </div>
  );
};

const CellDateTime = (field) => {
  return (column) => new Date(column[field]).toLocaleString();
};

export default ListLogs;
