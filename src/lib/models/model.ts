import { ModelParams } from '@types';

abstract class Model<D = any> {
  protected model: D;

  protected constructor(connexionModule: D) {
    this.model = connexionModule;
  }

  protected getKeyParams(params?: ModelParams): { take?: number; skip?: number } {
    return { skip: params?.skip || 0, take: params?.limit || 50 };
  }
}

export default Model;
