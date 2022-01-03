import { Country } from '@prisma/client';
import connexion from '@services/connexion';

const { country } = connexion;

export const all = (): Promise<Country[]> => {
  return country.findMany();
};
