import { AxiosInstance } from 'axios';

abstract class Api {
  private readonly _instance: AxiosInstance;
  private readonly _path: string;

  protected constructor(instance: AxiosInstance, path: string) {
    this._instance = instance;
    this._path = path;
  }

  protected get<R extends DefaultResponse = DefaultResponse, P = undefined>(
    path: string,
    params?: any
  ): Promise<R> {
    return this._instance.get<R, R, P>(`${this._path}${path}`, params);
  }

  protected post<R extends DefaultResponse = DefaultResponse, D = any>(
    path: string,
    data: D
  ): Promise<R> {
    return this._instance.post<R, R, D>(`${this._path}${path}`, data);
  }
}

export default Api;
