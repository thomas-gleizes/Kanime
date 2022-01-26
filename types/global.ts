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
};

export type CustomDate = Date | string;

export type TailwindcssGradiant =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

export type TailwindcssColors =
  | 'slate'
  | 'gray'
  | 'zinc'
  | 'neutral'
  | 'stone'
  | 'red'
  | 'orange'
  | 'amber'
  | 'yellow'
  | 'lime'
  | 'green'
  | 'emerald'
  | 'teal'
  | 'cyan'
  | 'sky'
  | 'blue'
  | 'indigo'
  | 'violet'
  | 'purple'
  | 'fuchsia'
  | 'pink'
  | 'rose';
