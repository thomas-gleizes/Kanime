import { Get, Query, ValidationPipe } from 'next-api-decorators';

import ApiHandler from 'class/ApiHandler';
import { apiHandler } from 'services/handler.service';
import { NotFoundException } from '../../exceptions/http';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

class Test {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Too short' })
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  query: string | undefined;

  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  @MinLength(3, { message: 'Too short' })
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  test: string | undefined;
}

class HomeApiHandler extends ApiHandler {
  @Get()
  get(@Query(ValidationPipe) query: Test) {
    throw new NotFoundException('ressource not found');

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
