import React, { useMemo } from 'react';
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
  const { value, actions } = usePagination(Infinity, 1);

  const { data, isFetching } = useQuery(['logs', value], () => fetchLogs(value), {
    keepPreviousData: true,
  });

  const logs = useMemo(() => data?.records || [], [data]);

  const max = useMemo(
    () => (data?.meta ? Math.ceil(data.meta.count / LIMIT) : 1),
    [data]
  );

  return (
    <div>
      <Pagination value={value} actions={actions} max={max} />
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
              {!isFetching
                ? logs.map((log, index) => (
                    <Tr key={index}>
                      <Td className="px-2">
                        {dayjs(log.createAt).format('DD/MM/YYYY à HH:mm:s')}
                      </Td>
                      <Td className="px-2">{log.method}</Td>
                      <Td className="px-2">{log.path}</Td>
                      <Td className="px-2">{log.ip}</Td>
                      <Td className="px-2">{log.user?.username}</Td>
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
                  ))
                : Array.from({ length: 8 }, (_, index) => (
                    <Tr key={index}>
                      <Td className="p-2">
                        <div className="h-5 w-11/12 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-1/3 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-2/3 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-1/2 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-10 bg-gray-200 rounded-lg animate-pulse" />
                      </Td>
                      <Td className="p-2">
                        <div className="h-5 w-10 bg-gray-200 rounded-lg animate-pulse" />
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
