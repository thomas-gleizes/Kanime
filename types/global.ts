import { User } from './users';
import { Method } from './server';

export type Log = {
  id: number;
  route: string;
  ip: string;
  method: Method;
  body: any;
  query: any;
  authToken?: User;
  createAt: Date | string;
};

export type Logs = Array<Log>;

export type ModelParams = {
  limit?: number;
  skip?: number;
}