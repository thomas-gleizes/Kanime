import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  TableContainer,
  Tbody,
  IconButton,
} from '@chakra-ui/react';

import { ApiService } from 'services/api.service';
import { routes } from 'resources/routes';
import toast from 'utils/toastr';
import { useToggle } from 'hooks';

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
    <div className="border rounded-md shadow-lg">
      <TableContainer>
        <Table size="xs">
          <Thead className="h-10 px-3">
            <Tr>
              <Th className="px-2">TIME</Th>
              <Th className="px-2">Method</Th>
              <Th className="px-2">Path</Th>
              <Th className="px-2">Ip</Th>
              <Th className="px-2">User</Th>
              <Th className="px-2">Params</Th>
              <Th className="px-2">Body</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, index) => (
              <Tr key={index}>
                <Td className="px-2">
                  {dayjs(log.createAt).format('DD/MM/YYYY à HH:mm:s')}
                </Td>
                <Td className="px-2">{log.method}</Td>
                <Td className="px-2">{log.path}</Td>
                <Td className="px-2">{log.ip}</Td>
                <Td className="px-2">{log.user && log.user.username}</Td>
                <Td className="px-2">
                  <IconButton
                    bgSize="xs"
                    color="teal"
                    variant="outline"
                    aria-label=""
                    icon={<FaEye />}
                  />
                </Td>
                <Td className="px-2 text-center">
                  <IconButton
                    color="teal"
                    variant="outline"
                    aria-label=""
                    icon={<FaEye />}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ListLogs;
