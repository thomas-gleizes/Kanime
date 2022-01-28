import { User } from './users';
import { Method } from './server';

export type Log = {
  id: number;
  route: Method;
  ip: string;
  method: Method;
  body: any;
  query: any;
  user?: User | null;
  createAt: string;
};

export type Logs = Array<Log>;

export type ModelParams = {
  limit?: number | string;
  skip?: number | string;
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
