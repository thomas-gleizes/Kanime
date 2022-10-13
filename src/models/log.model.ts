import { PrismaLogDelegate, PrismaLog, PrismaLogs } from 'app/prisma';
import connexion, { ConnexionType } from 'services/connexion.service';
import Model from 'class/Model';

type crateData = {
  path: string;
  method: Method;
  ip: string;
  body: Nullable<any>;
  params: any;
  userId?: number;
};

class LogModel extends Model<PrismaLogDelegate> {
  public constructor(connexion: ConnexionType) {
    super(connexion, 'log');
  }

  public show = (params: modelParams) =>
    this.model.findMany({
      orderBy: [{ id: 'desc' }],
      include: { user: true },
      ...this.getKeyParams(params),
    });

  public showUserLog = (userId: number, params: modelParams): Promise<PrismaLogs> =>
    this.model.findMany({ where: { userId }, ...this.getKeyParams(params) });

  public create = (data: crateData): Promise<PrismaLog> =>
    this.model.create({
      data: {
        path: data.path,
        method: data.method,
        ip: data.ip,
        body: data.body ? JSON.stringify(data.body) : null,
        params: data.params ? JSON.stringify(data.params) : null,
        userId: data.userId || null,
      },
    });
}

export default new LogModel(connexion);
