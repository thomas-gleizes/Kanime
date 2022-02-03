import { modelParams } from './global';
import { Animes } from './animes';
import { AxiosResponse } from 'axios';

/* REQUEST */

// global
export interface ReqDefaultParams {
  params?: modelParams;
}

// Animes

export interface ReqAnimesSearch extends ReqDefaultParams {
  query: string;
}

/* Response */

// global
export interface ResDefaultSuccess {
  success: boolean;
  debug?: any;
}

export interface ResDefaultError {
  error: string;
}

export type AxiosRes<T> = Promise<AxiosResponse<T>>;

// Animes

export interface ResAnimes extends ResDefaultSuccess {
  animes: Animes;
  count: number;
}

export interface ResAnimesSearch extends ResDefaultSuccess {
  animes: Animes;
  count: number;
}
