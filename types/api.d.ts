import { modelParams } from './global';
import { Animes } from './animes';
import { AxiosResponse } from 'axios';
import { User } from './users';

/* REQUEST */

// global
interface ReqDefaultParams {
  params?: modelParams;
}

// Animes

// Authentification

/* Response */

// global
interface ResDefaultSuccess {
  success: boolean;
  debug?: any;
}

interface ResDefaultError {
  error: string;
}

type AxiosRes<T> = Promise<AxiosResponse<T>>;

// Animes

interface ResAnimes extends ResDefaultSuccess {
  animes: Animes;
  count: number;
}

interface ResAnimesSearch extends ResDefaultSuccess {
  animes: Animes;
  count: number;
}

// Authentification

interface ResRegister extends ResDefaultSuccess {
  user: User;
  token: string;
}
