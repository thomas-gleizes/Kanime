import { PrismaMiddleware } from '../mappers/prisma.middleware';
import { ConnexionType } from 'services/connexion.service';

type Result = {
  include?: { [key: string]: boolean };
  take?: number;
  skip?: number;
};

abstract class Model<
  Delegate,
  Model,
  Output,
  Middleware extends PrismaMiddleware<Model, Output>
> {
  private _client: ConnexionType;
  private readonly _modelName: string;

  protected model: Delegate;

  protected constructor(client: ConnexionType, model: string) {
    this._client = client;
    this._modelName = model;

    this.model = client[model];
  }

  protected addMiddleware(middleware: Middleware) {
    this._client.$use(async (params, next) => {
      let result = await next(params);
      console.log('Params', params);
      console.log('Result', result);

      if (params.model.toLowerCase() === this._modelName.toLowerCase()) {
        result = middleware.onResult(result);
      }

      return result;
    });
  }

  protected getKeyParams(params?: modelParams): { take?: number; skip?: number } {
    return { skip: +params?.skip || 0, take: +params?.limit || 50 };
  }

  protected parseOptions<IncludeOptions = any>(
    options?: ModelOptions<IncludeOptions>
  ): Result {
    const result: Result = {};

    if (options.include && Object.keys(options.include).length) {
      result.include = {};

      for (const key of Object.keys(options.include)) {
        result.include[key] = true;
      }
    }

    if (options.limit) result.take = +options.limit;
    if (options.skip) result.skip = +options.skip;

    return result;
  }
}

export default Model;
