import type { Gender, User } from '@prisma/client';
import { Prisma } from '@prisma/client';

import connexion, { ConnexionType } from '../services/connexion';
import Model from '@lib/models/model';
import { defaultUsersMedia } from '../constants';

class UserModel extends Model {
  public constructor(connexion: ConnexionType) {
    super(connexion.user);
  }

  public findById = (id: number): Promise<User> =>
    this.connexion.findUnique({
      where: { id: id },
    });

  public create = (data: {
    login: string;
    email: string;
    password: string;
  }): Promise<User> =>
    this.connexion.create({
      data: {
        login: data.login,
        email: data.email,
        password: data.password,
        avatar_path: defaultUsersMedia.avatar,
        background_path: defaultUsersMedia.background,
      },
    });

  public update = (
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
    this.connexion.update({
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

  public findByEmail = (email: string): Promise<User> =>
    this.connexion.findUnique({
      where: { email },
    });

  public findByEmailOrLogin = (email: string, login: string): Promise<Array<User>> =>
    this.connexion.findMany({
      where: {
        OR: [{ email: email }, { login: login }],
      },
    });

  public findFollows = (id: number): Promise<Array<User>> =>
    this.connexion.findMany({
      where: {
        followers: { some: { follower_id: +id } },
      },
    });

  public findFollowers = (id: number): Promise<Array<User>> =>
    this.connexion.findMany({
      where: {
        follows: { some: { follow_id: +id } },
      },
    });
}

export default new UserModel(connexion);
