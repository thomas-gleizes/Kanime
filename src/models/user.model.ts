import { PrismaUserDelegate, PrismaUser, PrismaUsers } from 'app/prisma';
import connexion, { ConnexionType } from 'services/connexion.service';
import { DEFAULT_USER_MEDIA } from 'resources/constants';
import Model from 'class/Model';
import * as emailHelpers from 'utils/emailHelpers';
import { UpdateUserDto } from 'dto/user.dto';

class UserModel extends Model<PrismaUserDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'user');
  }

  public findAll = (params?: modelParams) =>
    this.model.findMany({ ...this.getKeyParams(params) });

  public findById = (id: number) => this.model.findUnique({ where: { id: +id } });

  public findByUsername = (username: string) =>
    this.model.findUnique({ where: { username } });

  public findBySlug = (slug: string) => this.model.findUnique({ where: { slug } });

  public create = (data: any): Promise<PrismaUser> =>
    this.model.create({
      data: {
        username: data.username,
        slug: data.username.toLowerCase().replaceAll(' ', '-'),
        email: data.email,
        realEmail: emailHelpers.removeDot(data.email),
        password: data.password,
        avatarPath: DEFAULT_USER_MEDIA.avatar,
        backgroundPath: DEFAULT_USER_MEDIA.background,
      },
    });

  public update = (id: number, data: UpdateUserDto): Promise<PrismaUser> =>
    this.model.update({
      where: { id },
      data: {
        city: data.city,
        bio: data.bio,
        gender: data.gender,
        birthday: data.birthday,
        avatarPath: data.avatar || DEFAULT_USER_MEDIA.avatar,
        backgroundPath: data.background || DEFAULT_USER_MEDIA.background,
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

  public checkResetPasswordToken = (token: string) =>
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

  public findByEmail = (email: string) =>
    this.model.findFirst({
      where: {
        OR: [{ realEmail: emailHelpers.removeDot(email) }, { email: email }],
      },
    });

  public findByEmailOrUsername = (email: string, username: string) =>
    this.model.findMany({
      where: {
        OR: [{ realEmail: emailHelpers.removeDot(email) }, { username }],
      },
    });

  public findFollows = (id: number, params?: modelParams) =>
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
