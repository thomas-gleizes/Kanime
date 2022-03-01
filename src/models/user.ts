import { PrismaUserDelegate, PrismaGender, PrismaUser, PrismaUsers } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import { defaultUsersMedia } from 'ressources/constants';
import Model from './model';

type createData = {
  username: string;
  email: string;
  password: string;
};

type updateData = {
  country_id?: number | null;
  city?: string | null;
  birthday?: Date | null;
  gender?: PrismaGender;
  bio?: string | null;
  avatarPath?: string | null;
  backgroundPath?: string | null;
};

class UserModel extends Model<PrismaUserDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.user);
  }

  public findById = (id: number): Promise<PrismaUser> =>
    this.model.findUnique({ where: { id: +id } });

  public findByUsername = (username: string): Promise<PrismaUser> =>
    this.model.findUnique({ where: { username } });

  public create = (data: createData): Promise<PrismaUser> =>
    this.model.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.password,
        avatar_path: defaultUsersMedia.avatar,
        background_path: defaultUsersMedia.background,
      },
    });

  public update = (id: number, data: updateData): Promise<PrismaUser> =>
    this.model.update({
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

  public updateResetPasswordToken = (
    id: number,
    token: string | null
  ): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        reset_password_token: token,
        last_ask_reset_password: new Date(),
      },
    });

  public checkResetPasswordToken = (token: string): Promise<PrismaUser> =>
    this.model.findFirst({
      where: {
        reset_password_token: token,
      },
    });

  public resetPassword = (id: number, newPassword: string): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        password: newPassword,
        reset_password_token: null,
        last_reset_password: new Date(),
      },
    });

  public findByEmail = (email: string): Promise<PrismaUser> =>
    this.model.findUnique({
      where: { email },
    });

  public findByEmailOrUsername = (
    email: string,
    username: string
  ): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        OR: [{ email }, { username }],
      },
    });

  public findFollows = (id: number, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        followers: { some: { follower_id: +id } },
      },
      ...this.getKeyParams(params),
    });

  public findFollowers = (id: number, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        follows: { some: { follow_id: +id } },
      },
      ...this.getKeyParams(params),
    });

  public findByAnime = (animeId: number): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        animes: { some: { anime_id: animeId } },
      },
    });

  public search = (query: string, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        OR: [{ username: { contains: query } }],
      },
      ...this.getKeyParams(params),
    });

  public count = (): Promise<unknown> => this.model.count({});

  public deleteAll = (): Promise<{ count: number }> => {
    if (!(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'))
      throw new Error('cannot delete all ressource in production');

    return this.model.deleteMany({});
  };
}

export default new UserModel(connexion);
