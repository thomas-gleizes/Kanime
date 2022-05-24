abstract class Model<D = unknown> {
  protected model: D;

  protected constructor(connexionModule: D) {
    this.model = connexionModule;
  }

  protected getKeyParams(params?: modelParams): { take?: number; skip?: number } {
    return { skip: +params?.skip || 0, take: +params?.limit || 50 };
  }

  protected parseOptions(options?: { includes: { [key: string]: any } }): {
    include: { [key: string]: true };
  } {
    const includes = {};

    for (const key of Object.keys(options.includes)) includes[key] = true;

    return {
      include: includes,
    };
  }
}

export default Model;
