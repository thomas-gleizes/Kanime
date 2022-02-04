import { User } from './users';
import { Method } from './server';

type Log = {
  id: number;
  route: Method;
  ip: string;
  method: Method;
  body: any;
  query: any;
  user?: User | null;
  createAt: string;
};

type Logs = Array<Log>;

type modelParams = {
  limit?: number | string | string[];
  skip?: number | string | string[];
};

type CustomDate = Date | string;

type TailwindcssGradiant = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

type TailwindcssColors =
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
