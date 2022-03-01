import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../services/handler.service';

handler.all(async (req: NextApiRequest, res: NextApiResponse) => {
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

  res.send({ routes });
});

export default handler;
