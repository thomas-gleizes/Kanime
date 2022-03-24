import { PrismaLogDelegate, PrismaLog, PrismaLogs } from 'prisma/app';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

type crateData = {
  route: string;
  method: Method;
  ip: string;
  body: any;
  query: any;
  userId?: number;
};

class LogModel extends Model<PrismaLogDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion.log);
  }

  public show = (params: modelParams): Promise<PrismaLogs> =>
    this.model.findMany({
      orderBy: [{ id: 'desc' }],
      include: { user: true },
      ...this.getKeyParams(params),
    });

  public showUserLog = (userId: number, params: modelParams): Promise<PrismaLogs> =>
    this.model.findMany({ where: { user_id: userId }, ...this.getKeyParams(params) });

  public create = (data: crateData): Promise<PrismaLog> =>
    this.model.create({
      data: {
        route: data.route,
        method: data.method,
        ip: data.ip,
        body: data.body ? JSON.stringify(data.body) : null,
        query: data.query ? JSON.stringify(data.query) : null,
        user_id: data.userId,
      },
    });
}

export default new LogModel(connexion);
