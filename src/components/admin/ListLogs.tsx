import React, { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';
import {
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { logsApi } from 'api';
import { usePagination } from 'hooks';
import Pagination from 'components/layouts/Pagination';

const LIMIT = 40;

const fetchLogs = (page: number) => logsApi.showAll({ limit: LIMIT, skip: page * LIMIT });

const ListLogs: Component = () => {
  const { value, actions } = usePagination(200, 8);

  const { isLoading, data, isFetching, isPreviousData } = useQuery(
    ['logs', value],
    ({ queryKey: [, page] }) => fetchLogs(page as number),
    { keepPreviousData: true }
  );

  useEffect(() => console.log('Data', data), [data]);
  useEffect(() => console.log('Value', value), [value]);

  const logs = useMemo(() => data?.records || [], [data]);

  return (
    <div>
      <Pagination value={value} actions={actions} max={20} />
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
    </div>
  );
};

export default ListLogs;
