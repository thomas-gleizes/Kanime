import { User } from '@prisma/client';
import connexion from '@services/connexion';
import { defaultUsersMedia } from '@lib/constants';

const { user } = connexion;

export const findById = (id: number): Promise<User> =>
  user.findUnique({
    where: { id: id },
  });

export const create = (data: any): Promise<User> =>
  user.create({
    data: {
      login: data.login,
      email: data.email,
      password: data.password,
      avatar_path: data.avatar_path,
      background_path: data.background_path,
    },
  });

export const findByEmail = (email: string): Promise<User> =>
  user.findUnique({
    where: { email },
  });

export const findByEmailOrLogin = (email: string, login: string): Promise<Array<User>> =>
  user.findMany({
    where: {
      OR: [{ email: email }, { login: login }],
    },
  });

export const findFollows = (id: number): Promise<Array<User>> =>
  user.findMany({
    where: {
      followers: { some: { follower_id: +id } },
    },
  });
