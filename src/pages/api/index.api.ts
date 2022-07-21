import { ApiRequest, ApiResponse } from 'next/app';
import { apiHandler } from 'services/handler.service';

const handler = apiHandler();

handler.all(async (req: ApiRequest, res: ApiResponse<any>) => {
  const routes = {
    '/': {
      GET: {
        desc: 'display all routes',
      },
    },
    '/animes': {
      '/': {
        GET: {
          desc: 'Show all animes',
          query: {
            limit: 'number : size of result { max: 200 }',
            skip: 'number : index of start',
          },
        },
        ':id': {
          '/': {
            GET: {
              desc: 'Show anime with id',
            },
          },
          '/sagas': {
            desc: 'Show animes on the same saga with id',
          },
        },
      },
    },
  };

  return res.json({ routes });
});

export default handler;
