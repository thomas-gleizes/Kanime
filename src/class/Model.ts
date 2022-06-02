type Result = {
  include?: { [key: string]: boolean };
  take?: number;
  skip?: number;
};

abstract class Model<D = unknown> {
  protected model: D;

  protected constructor(connexionModule: D) {
    this.model = connexionModule;
  }

  protected getKeyParams(params?: modelParams): { take?: number; skip?: number } {
    return { skip: +params?.skip || 0, take: +params?.limit || 50 };
  }

  protected parseOptions<IncludeOptions = any>(
    options?: ModelOptions<IncludeOptions>
  ): Result {
    const result: Result = {};

    if (Object.keys(options.include).length) {
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
