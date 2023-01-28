import { AxiosInstance, AxiosRequestConfig } from 'axios'

abstract class Api {
  private readonly _instance: AxiosInstance
  private readonly _path: string

  protected constructor(instance: AxiosInstance, path: string) {
    this._instance = instance
    this._path = path
  }

  protected get<R extends ApiResponse = ApiResponse, P = undefined>(
    path: string,
    params?: any
  ): Promise<R> {
    return this._instance.get<R, R, P>(`${this._path}${path}`, params)
  }

  protected post<R extends ApiResponse = ApiResponse, D = any>(path: string, data: D): Promise<R> {
    return this._instance.post<R, R, D>(`${this._path}${path}`, data)
  }

  protected patch<R extends ApiResponse = ApiResponse, D = any>(path: string, data: D): Promise<R> {
    return this._instance.patch<R, R, D>(`${this._path}${path}`, data)
  }

  protected put<R extends ApiResponse = ApiResponse, D = any>(path: string, data: D): Promise<R> {
    return this._instance.put<R, R, D>(`${this._path}${path}`, data)
  }

  protected delete<R extends ApiResponse = ApiResponse, P = undefined>(
    path: string,
    params: AxiosRequestConfig<P>
  ): Promise<R> {
    return this._instance.delete<R, R, P>(`${this._path}${path}`, params)
  }
}

export default Api
