import { Get } from 'next-api-decorators';

import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';

class HomeApiHandler extends ApiHandler {
  @Get()
  get() {
    return {
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
  }
}

export default apiHandler(HomeApiHandler);
