import { Category } from '@prisma/client';
import connexion from '../services/connexion';

const { category } = connexion;

export const findById = (id: number): Promise<Category> =>
  category.findUnique({
    where: { id: +id },
  });

export const findByAnimeId = (id: number): Promise<Array<Category>> =>
  category.findMany({
    where: {
      animes: { some: { anime_id: +id } },
    },
  });
