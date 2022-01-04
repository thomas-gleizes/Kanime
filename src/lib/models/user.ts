import type { Gender, User } from '@prisma/client';
import connexion from '../services/connexion';
import { defaultUsersMedia } from '../constants';

const { user } = connexion;

export const findById = (id: number): Promise<User> =>
  user.findUnique({
    where: { id: id },
  });

export const create = (data: {
  login: string;
  email: string;
  password: string;
}): Promise<User> =>
  user.create({
    data: {
      login: data.login,
      email: data.email,
      password: data.password,
      avatar_path: defaultUsersMedia.avatar,
      background_path: defaultUsersMedia.background,
    },
  });

export const update = (
  id: number,
  data: {
    country_id?: number | null;
    city?: string | null;
    birthday?: Date | null;
    gender?: Gender;
    bio?: string | null;
    avatarPath?: string | null;
    backgroundPath?: string | null;
  }
): Promise<User> =>
  user.update({
    where: { id },
    data: {
      country_id: data.country_id,
      city: data.city,
      bio: data.bio,
      gender: data.gender,
      birthday: data.birthday,
      avatar_path: data.avatarPath || defaultUsersMedia.avatar,
      background_path: data.backgroundPath || defaultUsersMedia.background,
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

export const deleteAll = (): Promise<any> => {
  if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
    throw new Error('cannot delete all user in production');

  return user.deleteMany({});
};

export const count = (): Promise<any> => {
  return user.count();
};
