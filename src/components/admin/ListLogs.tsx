import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import dayjs from 'dayjs';
import {
  Button,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { logsApi } from 'api';
import { useHideHeader } from 'hooks';

const fetchLogs = ({ pageParam = 0 }) =>
  logsApi.showAll({ limit: 39, skip: pageParam * 40 }).then((data) => data.logs);

const ListLogs: Component = () => {
  useHideHeader();

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<Logs>(['logs'], fetchLogs, {
    getNextPageParam: (_, pages) => pages.length,
    initialData: { pageParams: [0], pages: [] },
  });

  const [logs, setLogs] = useState<Logs>([]);

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
      <div className="flex justify-between">
        <Button onClick={() => fetchNextPage()}>Next</Button>
      </div>
    </div>
  );
};

export default ListLogs;
