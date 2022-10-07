import { PrismaUserDelegate, PrismaGender, PrismaUser, PrismaUsers } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import { defaultUsersMedia } from 'resources/constants';
import Model from 'class/Model';
import * as emailHelpers from 'utils/emailHelpers';

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
    super(connexion, 'user');
  }

  public findAll = (params?: modelParams) =>
    this.model.findMany({ ...this.getKeyParams(params) });

  public findById = (id: number): Promise<PrismaUser> =>
    this.model.findUnique({ where: { id: +id } });

  public findByUsername = (username: string): Promise<PrismaUser> =>
    this.model.findUnique({ where: { username } });

  public findBySlug = (slug: string): Promise<PrismaUser> =>
    this.model.findUnique({ where: { slug } });

  public create = (data: createData): Promise<PrismaUser> =>
    this.model.create({
      data: {
        username: data.username,
        slug: data.username.toLowerCase().replaceAll(' ', '-'),
        email: data.email,
        realEmail: emailHelpers.removeDot(data.email),
        password: data.password,
        avatarPath: defaultUsersMedia.avatar,
        backgroundPath: defaultUsersMedia.background,
      },
    });

  public update = (id: number, data: updateData): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        countryId: data.country_id,
        city: data.city,
        bio: data.bio,
        gender: data.gender,
        birthday: data.birthday,
        avatarPath: data.avatarPath || defaultUsersMedia.avatar,
        backgroundPath: data.backgroundPath || defaultUsersMedia.background,
      },
    });

  public updateResetPasswordToken = (
    id: number,
    token: string | null
  ): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        resetPasswordToken: token,
        lastAskResetPassword: new Date(),
      },
    });

  public checkResetPasswordToken = (token: string): Promise<PrismaUser> =>
    this.model.findFirst({
      where: {
        resetPasswordToken: token,
      },
    });

  public resetPassword = (id: number, newPassword: string): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        password: newPassword,
        resetPasswordToken: null,
        lastAskResetPassword: new Date(),
      },
    });

  public findByEmail = (email: string): Promise<PrismaUser> =>
    this.model.findFirst({
      where: {
        OR: [{ realEmail: emailHelpers.removeDot(email) }, { email: email }],
      },
    });

  public findByEmailOrUsername = (
    email: string,
    username: string
  ): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        OR: [{ realEmail: emailHelpers.removeDot(email) }, { username }],
      },
    });

  public findFollows = (id: number, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        followers: { some: { followerId: +id } },
      },
      ...this.getKeyParams(params),
    });

  public findFollowers = (id: number, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        follows: { some: { followId: +id } },
      },
      ...this.getKeyParams(params),
    });

  public findByAnime = (animeId: number, params?: modelParams): Promise<PrismaUsers> =>
    this.model.findMany({
      where: {
        animes: { some: { animeId } },
      },
      ...this.getKeyParams(params),
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
