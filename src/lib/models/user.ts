import { Gender, Prisma, User } from '@prisma/client';

import connexion, { ConnexionType } from '../services/connexion';
import Model from '@lib/models/model';
import { defaultUsersMedia } from '../constants';
import { ModelParams } from '@types';

type createData = {
  login: string;
  email: string;
  password: string;
};

type updateData = {
  country_id?: number | null;
  city?: string | null;
  birthday?: Date | null;
  gender?: Gender;
  bio?: string | null;
  avatarPath?: string | null;
  backgroundPath?: string | null;
};

class UserModel extends Model<Prisma.UserDelegate<unknown>> {
  public constructor(connexion: ConnexionType) {
    super(connexion.user);
  }

  public findById = (id: number): Promise<User> =>
    this.model.findUnique({
      where: { id: id }
    });

  public create = (data: createData): Promise<User> =>
    this.model.create({
      data: {
        login: data.login,
        email: data.email,
        password: data.password,
        avatar_path: defaultUsersMedia.avatar,
        background_path: defaultUsersMedia.background
      }
    });

  public update = (id: number, data: updateData): Promise<User> =>
    this.model.update({
      where: { id },
      data: {
        country_id: data.country_id,
        city: data.city,
        bio: data.bio,
        gender: data.gender,
        birthday: data.birthday,
        avatar_path: data.avatarPath || defaultUsersMedia.avatar,
        background_path: data.backgroundPath || defaultUsersMedia.background
      }
    });

  public findByEmail = (email: string): Promise<User> =>
    this.model.findUnique({
      where: { email }
    });

  public findByEmailOrLogin = (email: string, login: string): Promise<Array<User>> =>
    this.model.findMany({
      where: {
        OR: [{ email: email }, { login: login }]
      }
    });

  public findFollows = (id: number, params?: ModelParams): Promise<Array<User>> =>
    this.model.findMany({
      where: {
        followers: { some: { follower_id: +id } }
      },
      ...this.getKeyParams(params)
    });

  public findFollowers = (id: number, params?: ModelParams): Promise<Array<User>> =>
    this.model.findMany({
      where: {
        follows: { some: { follow_id: +id } }
      },
      ...this.getKeyParams(params)
    });

  public findByAnime = (animeId: number): Promise<Array<User>> =>
    this.model.findMany({
      where: {
        animes: { some: { anime_id: animeId } }
      }
    });

  public search = (query: string, params?: ModelParams): Promise<Array<User>> => this.model.findMany({
    where: {
      OR: [
        { login: { contains: query } }
      ]
    },
    ...this.getKeyParams(params)
  });

  public count = () => this.model.count({});

  public deleteAll = (): Promise<{ count: number }> => {
    if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
      throw new Error('cannot delete all ressource in production');

    return this.model.deleteMany({});
  };
}

export default new UserModel(connexion);
