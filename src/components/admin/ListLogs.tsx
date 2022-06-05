import React, { useEffect, useState } from 'react';

import { ApiService } from 'services/api.service';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import { useToggle } from 'hooks';

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

  return null;
};

export default ListLogs;
