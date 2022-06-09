import React, { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
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
import dayjs from 'dayjs';

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

  return (
    <TableContainer>
      <Table variant="striped" size="xs">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th>Method</Th>
            <Th>Path</Th>
            <Th>Ip</Th>
            <Th>User</Th>
            <Th>Params</Th>
            <Th>Body</Th>
          </Tr>
        </Thead>
        <Tbody>
          {logs.map((log, index) => (
            <Tr key={index}>
              <Td>{dayjs(log.createAt).format('DD/MM/YYYY à HH:mm:s')}</Td>
              <Td>{log.method}</Td>
              <Td>{log.path}</Td>
              <Td>{log.ip}</Td>
              <Td>{log.user && log.user.username}</Td>
              <Td>
                <IconButton
                  color="teal"
                  variant="outline"
                  aria-label=""
                  icon={<FaEye />}
                />
              </Td>
              <Td></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListLogs;
