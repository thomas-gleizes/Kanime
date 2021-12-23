import { Anime } from '@prisma/client';
import connexion from '@lib/connexion';

const { anime: animes } = connexion;

declare type params = {
  limit?: number;
  skip?: number;
}

export const findById = (id: number): Promise<Anime> =>
  animes.findUnique({
    where: { id: id }
  });


export const findBySlug = (slug: string): Promise<Anime> =>
  animes.findUnique({
    where: { slug }
  });

export const getMany = (params?: params): Promise<Array<Anime>> =>
  animes.findMany({
    take: params.limit || 10,
    skip: params.skip || 0
  });

export const search = (query: string, params?: params): Promise<Array<Anime>> => animes.findMany({
  where: {
    canonical_title: {
      contains: `${query}`
    }
  },
  take: params.limit || 10,
  skip: params.skip || 0
});