import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const routes = {
    '/': {
      GET: {
        desc: 'display all routes'
      }
    },
    '/animes': {
      '/': {
        GET: {
          desc: 'Show all animes',
          query: {
            limit: 'number : size of result { max: 200 }',
            skip: 'number : index of start'
          }
        },
        ':id': {
          '/': {
            GET: {
              desc: 'Show anime with id'
            }
          },
          '/sagas': {
            desc: 'Show animes on the same saga with id'
          }
        }
      }
    }
  };

  res.status(200).send({ success: true, routes });
}
