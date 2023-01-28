import { ConnexionType } from 'services/connexion.service'

type Result = {
  include?: { [key: string]: boolean }
  take?: number
  skip?: number
}

abstract class Model<Delegate> {
  private _client: ConnexionType
  private readonly _modelName: string

  protected model: Delegate

  protected constructor(client: ConnexionType, model: string) {
    this._client = client
    this._modelName = model

    // @ts-ignore
    this.model = client[model]
  }

  // protected addMiddleware(middleware: Middleware) {
  //   throw new Error("doesn't work");
  //
  //   this._client.$use(async (params, next) => {
  //     let result = await next(params);
  //
  //     if (params.model.toLowerCase() === this._modelName.toLowerCase()) {
  //       result = middleware.onResult(result);
  //     }
  //
  //     return result;
  //   });
  // }

  public countTotal = (): Promise<number> =>
    // @ts-ignore
    this.model.count()

  protected getKeyParams(params?: modelParams): { take?: number; skip?: number } {
    return { skip: params?.skip || 0, take: params?.limit || 20 }
  }

  protected parseOptions<IncludeOptions = any>(options?: ModelOptions<IncludeOptions>): Result {
    const result: Result = {}

    if (options?.include && Object.keys(options.include).length) {
      result.include = {}

      for (const key of Object.keys(options.include)) {
        result.include[key] = true
      }
    }

    if (options?.limit) result.take = +options.limit
    if (options?.skip) result.skip = +options.skip

    return result
  }
}

export default Model
